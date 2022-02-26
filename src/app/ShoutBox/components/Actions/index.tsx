import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { MessageTextField } from '../MessageTextField';

interface ActionsProps {
    onMessage: (message: string) => void
}

const Actions: React.FC<ActionsProps> = ({ onMessage }) => {

    const [message, setMessage] = useState<string>('');

    const handleSendMessage = () => {
        if (message.trim()) {
            onMessage(message);
            setMessage('');
        }
    }

    return (
        <Box display="flex">
            <MessageTextField
                label="Message"
                placeholder='Write your message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                fullWidth
            />
            <IconButton
                color="primary"
                onClick={() => handleSendMessage()}>
                <SendRoundedIcon />
            </IconButton>
        </Box>
    );
}

export default Actions;
