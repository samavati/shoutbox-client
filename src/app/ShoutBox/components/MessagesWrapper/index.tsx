import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const MessagesWrapper = styled(Box)(({ theme }) => ({
    flex: 1,
    margin: theme.spacing(0, 0, 2),
    padding: theme.spacing(0, 1),
    overflowY: 'auto',
    '& div:not(:last-child)': {
        marginBottom: theme.spacing(2)
    }
}))