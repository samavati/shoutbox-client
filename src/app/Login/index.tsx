import React from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import Typography from '@mui/material/Typography';

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <MeetingRoomRoundedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Enter the Chat
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Your name"
                        name="user_name"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Enter
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;