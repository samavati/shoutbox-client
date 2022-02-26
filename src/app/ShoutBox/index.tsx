import React, { useEffect, useState } from 'react';
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

export interface AdminMessage {
    type: string, message: string, data: any
}

interface ShoutBoxProps {

}

const ShoutBox: React.FC<ShoutBoxProps> = () => {

    const socket = useSocket();
    const { user, setUser } = useUser();
    const { roomUsers, setRoomUsers } = useRoomUsers();
    const [messages, setMessages] = useState<IMessage[]>([]);

    const handleSendMessage = (message: string) => {
        socket?.emit('message', { message });
    }

    useEffect(() => {

        socket?.on('message', (message: Omit<IMessage, 'isMe'>) => {
            setMessages(prev => [...prev, { ...message, isMe: message.user.id === user?.id }]);
        });

        socket?.on('ADMIN_MESSAGE', ({ type, message, data }: AdminMessage) => {
            if (type === 'NEW_MEMBER_JOINED') {
                setRoomUsers(prev => [...prev, data])
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
                                    itemData={roomUsers}
                                    itemCount={roomUsers.length}
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