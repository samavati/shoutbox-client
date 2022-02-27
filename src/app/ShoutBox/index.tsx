import React, { useEffect, useMemo, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ShoutBoxPaper } from './components/ShoutBoxPaper';
import { AttendeesWrapper } from './components/AttendeesWrapper';
import Attendee from './components/Attendee';
import { faker } from '@faker-js/faker';
import { MessagesWrapper } from './components/MessagesWrapper';
import { IMessage } from '../../model/Message';
import Message from './components/Message';
import Actions from './components/Actions';
import { useSocket } from '../../context/socket.context';
import { useUser } from '../../context/user.context';
import { useRoomUsers } from '../../context/room.context';
import { AdminMessageEvent, MessageEvent } from '../../enums/MessageEvenet.enum';
import { getAllUsers } from '../../services/users.service';

export interface AdminMessage {
    type: string, message: string, data: any
}

interface ShoutBoxProps {

}

const ShoutBox: React.FC<ShoutBoxProps> = () => {

    const socket = useSocket();
    const { user } = useUser();
    const { roomUsers, setRoomUsers } = useRoomUsers();
    const [messages, setMessages] = useState<IMessage[]>([]);

    const arrayRemoteUsers = useMemo(() => Object.values(roomUsers), [roomUsers])

    const handleSendMessage = (message: string) => {
        socket?.emit(MessageEvent.USER_MESSAGE, { message });
    }

    useEffect(() => {
        getAllUsers()
            .then(res => res.data.reduce((a, v) => ({ ...a, [v.id]: v }), {}))
            .then(data => setRoomUsers(data))
    }, [])

    useEffect(() => {

        socket?.on(MessageEvent.USER_MESSAGE, (message: Omit<IMessage, 'isMe'>) => {
            setMessages(prev => [...prev, { ...message, isMe: message.user.id === user?.id }]);
        });

        socket?.on(MessageEvent.ADMIN_MESSAGE, ({ type, message, data }: AdminMessage) => {
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
        })

        return () => {
            socket?.close()
        }

    }, [socket])

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