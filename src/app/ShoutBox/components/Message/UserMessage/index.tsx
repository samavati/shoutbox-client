import React from 'react';
import Paper from '@mui/material/Paper';
import uniqolor from 'uniqolor';
import sanitizeHtml from 'sanitize-html';
import { format } from 'date-fns';
import { IUserMessage } from '../../../../../model/Message';
import Typography from '@mui/material/Typography';

interface UserMessageProps {
    userMessage: IUserMessage
}

const UserMessage: React.FC<UserMessageProps> = ({ userMessage }) => {
    const { user, message, date } = userMessage;

    return (
        <div style={{ display: 'flex', marginBottom: '2px' }}>
            <div>
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
            </div>
        </div>
    );
}

export default React.memo(UserMessage);