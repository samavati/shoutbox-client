import React from 'react';
import Paper from '@mui/material/Paper';
import uniqolor from 'uniqolor';
import { IMessage } from '../../../../model/Message';
import { Typography, useTheme } from '@mui/material';

interface MessageProps {
    message: IMessage
}

const Message: React.FC<MessageProps> = ({ message }) => {

    const attendeeName = message.isMe ? 'You' : message.user.name;
    const theme = useTheme();

    return (
        <div style={{ display: 'flex', justifyContent: message.isMe ? 'end' : 'start' }}>
            <Paper sx={{
                maxWidth: '300px',
                padding: '10px',
                backgroundColor: message.isMe ? theme.palette.primary.main : undefined,
                color: message.isMe ? 'white' : undefined
            }}>
                <Typography
                    variant="caption"
                    fontWeight="bold"
                    style={{ color: message.isMe ? 'white' : uniqolor(attendeeName).color }}
                >
                    {attendeeName}
                </Typography>
                <Typography style={{ wordBreak: 'break-all' }}>{message.message}</Typography>
            </Paper>
        </div>
    );
}

export default React.memo(Message);