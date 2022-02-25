import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Message from '../Message';
import { MessagesWrapper } from '../MessagesWrapper';
import { MessageTextField } from '../MessageTextField';

interface ActionsProps {
    onMessage: (message: string) => void
}

const Actions: React.FC<ActionsProps> = ({ onMessage }) => {

    const [message, setMessage] = useState<string>('');

    return (
        <Box display="flex">
            <MessageTextField
                label="Message"
                placeholder='Write your message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
            />
            <IconButton color="primary" onClick={() => { onMessage(message); setMessage('') }}>
                <SendRoundedIcon />
            </IconButton>
        </Box>
    );
}

export default Actions;
