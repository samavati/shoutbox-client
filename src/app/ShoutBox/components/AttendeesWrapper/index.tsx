import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const AttendeesWrapper = styled(Paper)(({ theme }) => ({
    height: '100%',
    width: '200px',
    overflowY: 'auto',
    marginRight: theme.spacing(1)
}))