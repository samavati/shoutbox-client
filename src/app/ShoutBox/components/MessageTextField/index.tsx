import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const MessageTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'white',
        borderRadius: '30px'
    },
}))