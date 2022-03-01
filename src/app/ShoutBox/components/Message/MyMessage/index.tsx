import React from 'react';
import Paper from '@mui/material/Paper';
import sanitizeHtml from 'sanitize-html';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import { format } from 'date-fns';
import { IUserMessage } from '../../../../../model/Message';

interface MyMessageProps {
    myMessage: IUserMessage
}

const MyMessage: React.FC<MyMessageProps> = ({ myMessage }) => {
    const { message, date } = myMessage;
    const theme = useTheme();

    return (
        <Box
            component="div"
            aria-label="message"
            display="flex"
            mb="2px"
            justifyContent="end"
        >
            <Box>
                <Paper sx={{
                    maxWidth: '300px',
                    padding: '10px',
                    backgroundColor: theme.palette.primary.main,
                    color: 'white'
                }}>
                    <Typography
                        variant="caption"
                        fontWeight="bold"
                        style={{ color: 'white' }}
                    >
                        You
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

export default React.memo(MyMessage);