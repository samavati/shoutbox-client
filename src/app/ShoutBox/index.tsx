import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ShoutBoxPaper } from './components/ShoutBoxPaper';
import { UsersListWrapper } from './components/UsersListWrapper';
import User from './components/User';
import { IAdminMessage, IMessage, IUserMessage } from '../../model/Message';
import Message from './components/Message';
import Actions from './components/Actions';
import { useSocket } from '../../context/socket.context';
import { useUser } from '../../context/user.context';
import { useRoomContext } from '../../context/room.context';
import { AdminMessageEvent, MessageEvent } from '../../enums/MessageEvent.enum';
import { getAllUsers } from '../../services/users.service';
import MessagesWrapper from './components/MessagesWrapper';
import { getConfig } from '../../services/config.service';
import Hidden from '@mui/material/Hidden';
import { replaceHyperlinks } from '../../utils/replaceHyperlinks';
import { xor } from 'lodash';
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
    const handleAdminMessageEvents = useCallback(({ type, payload }: IAdminMessage) => {

        if (type === AdminMessageEvent.JOINED_SUCCESSFULLY) {

        }

        if (type === AdminMessageEvent.NEW_MEMBER_JOINED) {
            setRoomUsers(prev => ({ ...prev, [payload.data.id]: payload.data }))
        }

        if (type === AdminMessageEvent.LEAVED_SUCCESSFULLY) {
            setRoomUsers(prev => {
                const newRemoteUsers = { ...prev };
                delete newRemoteUsers[payload.data.id]
                return newRemoteUsers
            })
        }

        setMessages(prev => [...prev, { type: 'admin', payload: { id: payload.id, message: payload.message } }]);

    }, [setRoomUsers]);

    /**
     * A callback function, listens to the Users Messages
     */
    const handleUserMessageEvents = useCallback((message: IUserMessage) => {
        setMessages(prev => {
            // Ensure that the number of showing messages is in accordance with the configuration
            const usersMessages = prev.filter(message => message.type !== 'admin');
            const { length } = usersMessages;
            let diff = (length + 1) - showLimitMessage.current;
            let shouldRemoveMessages: IMessage[] = [];

            if (diff > 0) {
                shouldRemoveMessages = usersMessages.splice(0, diff);
            }

            return [
                ...xor(prev, shouldRemoveMessages),
                {
                    type: message.user.id === user?.id ? 'me' : 'user',
                    payload: {
                        ...message, message: replaceHyperlinks(message.message)
                    }
                }
            ]
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
            <Box height="100vh" py={1} className='shout-box-wrapper'>
                <ShoutBoxPaper>
                    <Hidden mdDown>
                        <UsersListWrapper id="users-list-wrapper">
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
                                        {User}
                                    </FixedSizeList>
                                )}
                            </AutoSizer>
                        </UsersListWrapper>
                    </Hidden>
                    <Box display="flex" flexDirection="column" flex={1}>
                        <MessagesWrapper id="message-list-wrapper">
                            {messages.map((message) => (<Message key={message.payload.id} message={message} />))}
                        </MessagesWrapper>
                        <Actions onMessage={(message) => handleSendMessage(message)} />
                    </Box>
                </ShoutBoxPaper>
            </Box>
        </Container>
    );
}

export default ShoutBox;