import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ScrollToBottom from 'react-scroll-to-bottom';

export const StyledMessagesWrapper = styled(Box)(({ theme }) => ({
    flex: 1,
    margin: theme.spacing(0, 0, 2),
    padding: theme.spacing(0, 1),
    overflowY: 'auto',
    '& > div': {
        height: '100%'
    }
}));

interface MessagesWrapperProps extends BoxProps {

}

const MessagesWrapper: React.FC<MessagesWrapperProps> = ({ children, ...props }) => {

    return (
        <StyledMessagesWrapper {...props}>
            <ScrollToBottom>
                {children}
            </ScrollToBottom>
        </StyledMessagesWrapper>
    );
}

export default MessagesWrapper;