import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import uniqolor from 'uniqolor';
import sanitizeHtml from 'sanitize-html';
import { format } from 'date-fns';
import { IUserMessage } from '../../../../../model/Message';

interface UserMessageProps {
    userMessage: IUserMessage
}

/**
 * Shows Users(except current user) Message in the messages list wrapper 
 */
const UserMessage: React.FC<UserMessageProps> = ({ userMessage }) => {
    const { user, message, date } = userMessage;

    return (
        <Box component="div" aria-label="message" display="flex" mb="2px">
            <Box>
                <Paper sx={{
                    maxWidth: '300px',
                    padding: '10px',
                }}>
                    <Typography
                        variant="caption"
                        fontWeight="bold"
                        style={{ color: uniqolor(user.name).color }}
                    >
                        {user.name}
                    </Typography>
                    <Typography
                        style={{ wordBreak: 'break-all' }}
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(message) }}
                    />
                </Paper>
                <Typography variant="caption">{format(new Date(date), 'd MMM H:mm')}</Typography>
            </Box>
        </Box>
    );
}

export default React.memo(UserMessage);