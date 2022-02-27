import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ShoutBoxPaper } from './components/ShoutBoxPaper';
import { AttendeesWrapper } from './components/AttendeesWrapper';
import Attendee from './components/Attendee';
import { IMessage } from '../../model/Message';
import Message from './components/Message';
import Actions from './components/Actions';
import { useSocket } from '../../context/socket.context';
import { useUser } from '../../context/user.context';
import { useRoomContext } from '../../context/room.context';
import { AdminMessageEvent, MessageEvent } from '../../enums/MessageEvent.enum';
import { getAllUsers } from '../../services/users.service';
import MessagesWrapper from './components/MessagesWrapper';
import { getConfig } from '../../services/config.service';

export interface AdminMessage {
    type: string, message: string, data: any
}

interface ShoutBoxProps {

}

const ShoutBox: React.FC<ShoutBoxProps> = () => {

    const socket = useSocket();
    const { user } = useUser();
    const { roomUsers, setRoomUsers } = useRoomContext();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const arrayRemoteUsers = useMemo(() => Object.values(roomUsers), [roomUsers]);
    let showLimitMessage = useRef(100);

    /**
     * Gets users who are already in the room, and show message limit from the server.
     */
    const handleInitialSetUp = useCallback(() => {
        getAllUsers()
            .then(res => res.data.reduce((a, v) => ({ ...a, [v.id]: v }), {}))
            .then(data => setRoomUsers(data));

        getConfig()
            .then(res => showLimitMessage.current = res.data.show_limit);
    }, [setRoomUsers]);

    /**
     * A callback function, listens to the Admin Messages
     */
    const handleAdminMessageEvents = useCallback(({ type, message, data }: AdminMessage) => {
        if (type === 'JOINED_SUCCESSFULLY') {
            console.log(message)
        }
        switch (type) {
            case AdminMessageEvent.NEW_MEMBER_JOINED:
                setRoomUsers(prev => ({ ...prev, [data.id]: data }))
                break;
            case AdminMessageEvent.LEAVED_SUCCESSFULLY:
                setRoomUsers(prev => {
                    const newRemoteUsers = { ...prev };
                    delete newRemoteUsers[data.id]
                    return newRemoteUsers
                })
                break;
            default:
                break;
        }
    }, [setRoomUsers]);

    /**
     * A callback function, listens to the Users Messages
     */
    const handleUserMessageEvents = useCallback((message: Omit<IMessage, 'isMe'>) => {
        setMessages(prev => {
            // Ensure that the number of showing messages is in accordance with the configuration
            const newMessages = [...prev];
            const { length } = newMessages;
            let diff = (length + 1) - showLimitMessage.current;
            if (diff > 0) {
                newMessages.splice(0, diff);
            }
            return [...newMessages, { ...message, isMe: message.user.id === user?.id }]
        });
    }, [user?.id])

    const handleSendMessage = (message: string) => {
        socket?.emit(MessageEvent.USER_MESSAGE, { message });
    }

    // initial set up of the room
    useEffect(() => {
        handleInitialSetUp()
    }, [handleInitialSetUp])

    useEffect(() => {
        // tell that I want to join.
        socket?.emit('JOIN', { name: user?.name });

        socket?.on(MessageEvent.USER_MESSAGE, handleUserMessageEvents);
        socket?.on(MessageEvent.ADMIN_MESSAGE, handleAdminMessageEvents)
        return () => {
            // close connection after unmount component.
            socket?.close()
        }
    }, [socket, handleAdminMessageEvents, handleUserMessageEvents, user?.name])

    return (
        <Container component="main" maxWidth="md">
            <Box className='shout-box-wrapper'>
                <ShoutBoxPaper>
                    <AttendeesWrapper>
                        <AutoSizer>
                            {({ height, width }) => (
                                <FixedSizeList
                                    className="List"
                                    height={height}
                                    itemData={arrayRemoteUsers}
                                    itemCount={arrayRemoteUsers.length}
                                    itemSize={46}
                                    width={width}
                                >
                                    {Attendee}
                                </FixedSizeList>
                            )}
                        </AutoSizer>
                    </AttendeesWrapper>
                    <Box display="flex" flexDirection="column" flex={1} pl="5px">
                        <MessagesWrapper>
                            {messages.map((message) => (<Message key={message.id} message={message} />))}
                        </MessagesWrapper>
                        <Actions onMessage={(message) => handleSendMessage(message)} />
                    </Box>
                </ShoutBoxPaper>
            </Box>
        </Container>
    );
}

export default ShoutBox;