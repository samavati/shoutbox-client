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
import { IUser } from '../../model/User';
import { IMessage } from '../../model/Message';
import Message from './components/Message';
import Actions from './components/Actions';
import { useSocket } from '../../context/socket.context';

interface ShoutBoxProps {

}

const ShoutBox: React.FC<ShoutBoxProps> = () => {

    const socket = useSocket();
    const [attendees, setAttendees] = useState<IUser[]>(new Array(100000).fill('').map((value, index) => ({ id: index.toString(), name: faker.name.findName() })));
    const [messages, setMessages] = useState<IMessage[]>(new Array(5000).fill('').map((value, index) => ({ id: index.toString(), attendee: { id: '2', name: faker.name.findName() }, message: faker.lorem.paragraph(), isMe: Math.random() < 0.5 })));

    useEffect(() => {

        socket?.on('message', (message) => {
            setMessages(prev => [...prev, { id: '5', attendee: { id: '5', name: 'kjsb' }, isMe: true, message }])
        })

        return () => { socket?.close() }
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
                                    itemData={attendees}
                                    itemCount={attendees.length}
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
                        <Actions onMessage={(message) => socket?.emit('message', message)} />
                    </Box>
                </ShoutBoxPaper>
            </Box>
        </Container>
    );
}

export default ShoutBox;