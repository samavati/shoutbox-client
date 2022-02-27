import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ScrollToBottom from 'react-scroll-to-bottom';

export const StyledMessagesWrapper = styled(Box)(({ theme }) => ({
    flex: 1,
    margin: theme.spacing(0, 0, 2),
    padding: theme.spacing(0, 1),
    overflowY: 'auto',
    '& div:not(:last-child)': {
        marginBottom: theme.spacing(2)
    },
    '& > div': {
        height: '100%'
    }
}));

interface MessagesWrapperProps {

}

const MessagesWrapper: React.FC<MessagesWrapperProps> = ({ children }) => {

    return (
        <StyledMessagesWrapper>
            <ScrollToBottom>
                {children}
            </ScrollToBottom>
        </StyledMessagesWrapper>
    );
}

export default MessagesWrapper;