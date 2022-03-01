import React from 'react';
import { IMessage, IUserMessage } from '../../../../model/Message';
import AdminMessage from './AdminMessage';
import MyMessage from './MyMessage';
import UserMessage from './UserMessage';

interface MessageProps {
    message: IMessage
}

/**
 * This component decides how to show message in the messages wrapper.
 * there are 3 kind of messages:
 * 
 *  **User Message**: messages from online users **expect messages from the user that is client now**
 * 
 *  **MY Message**: messages that current user sends
 * 
 *  **Admin Message**: messages from admin when new user joined or left the room
 */
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