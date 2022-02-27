import React from 'react';
import Paper from '@mui/material/Paper';
import uniqolor from 'uniqolor';
import sanitizeHtml from 'sanitize-html';
import { IMessage } from '../../../../model/Message';
import { Typography, useTheme } from '@mui/material';
import { format } from 'date-fns';

interface MessageProps {
    message: IMessage
}

const Message: React.FC<MessageProps> = ({ message }) => {

    const attendeeName = message.isMe ? 'You' : message.user.name;
    const theme = useTheme();

    return (
        <div style={{ display: 'flex', marginBottom: '2px', justifyContent: message.isMe ? 'end' : 'start' }}>
            <div>
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
                    <Typography
                        style={{ wordBreak: 'break-all' }}
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(message.message) }}
                    />
                </Paper>
                <Typography variant="caption">{format(new Date(message.date), 'd MMM H:mm')}</Typography>
            </div>
        </div>
    );
}

export default React.memo(Message);