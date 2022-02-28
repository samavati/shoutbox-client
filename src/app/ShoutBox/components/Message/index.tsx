import React from 'react';
import { IMessage, IUserMessage } from '../../../../model/Message';
import AdminMessage from './AdminMessage';
import MyMessage from './MyMessage';
import UserMessage from './UserMessage';

interface MessageProps {
    message: IMessage
}

const Message: React.FC<MessageProps> = ({ message }) => {

    if (message.type === 'user') {
        return <UserMessage userMessage={message.payload as IUserMessage} />
    }

    if (message.type === 'me') {
        return <MyMessage myMessage={message.payload as IUserMessage} />
    }

    return <AdminMessage adminMessage={message.payload} />

}

export default React.memo(Message);