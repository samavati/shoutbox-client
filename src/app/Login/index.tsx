import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import Typography from '@mui/material/Typography';
import { useUser } from '../../context/user.context';
import { Form, Formik } from 'formik';
import FormikTextField from './components/FormikTextField';
import { useSocket } from '../../context/socket.context';
import { useRoomUsers } from '../../context/room.context';
import { getAllUsers } from '../../services/users.service';
import { AdminMessage } from '../ShoutBox';

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {

    const { setUser } = useUser();
    const { setRoomUsers } = useRoomUsers();
    const socket = useSocket();

    useEffect(() => {

        socket?.on('ADMIN_MESSAGE', ({ type, message, data }: AdminMessage) => {
            if (type === 'JOINED_SUCCESSFULLY') {
                setUser(data);
                getAllUsers().then(res => setRoomUsers(res.data))
            }
        })

    }, [socket])

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
                <Formik
                    initialValues={{ userName: '' }}
                    onSubmit={(values) => {
                        socket?.emit('JOIN', { name: values.userName });
                    }}
                >
                    <Form noValidate>
                        <Box sx={{ mt: 1 }}>
                            <FormikTextField
                                margin="normal"
                                required
                                fullWidth
                                label="Your name"
                                name="userName"
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
                    </Form>
                </Formik>
            </Box>
        </Container>
    );
}

export default Login;