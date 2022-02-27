import React from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import Typography from '@mui/material/Typography';
import { useUser } from '../../context/user.context';
import { Form, Formik } from 'formik';
import FormikTextField from './components/FormikTextField';
import { useSocket } from '../../context/socket.context';
import { joinUser } from '../../services/users.service';

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {

    const { setUser } = useUser();
    const socket = useSocket();


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
                    onSubmit={async (values, { setFieldError, setSubmitting }) => {
                        try {
                            const { data } = await joinUser(values.userName, socket.id);
                            setUser({ id: data.id, name: data.name });
                        } catch (error: any) {
                            setFieldError('userName', error.response.data.message);
                            setSubmitting(false)
                        }
                    }}
                >
                    {({ isSubmitting }) => (
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
                                <LoadingButton
                                    type="submit"
                                    fullWidth
                                    loading={isSubmitting}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Enter
                                </LoadingButton>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}

export default Login;