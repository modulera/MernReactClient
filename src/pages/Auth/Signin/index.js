import './signin.scss';
import React, { useState } from 'react';
import { Redirect, Link as RaouteLink } from 'react-router-dom';
import { loginUser, useAuthState, useAuthDispatch } from '../../../context/auth'

import {
    Container,
    Box,
    Typography,
    Button,
    Avatar,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Fade,
} from '@mui/material';

import {
    Send as SendIcon,
    LockOutlined as LockOutlinedIcon,
} from '@mui/icons-material';

import {
    LoadingButton
} from '@mui/lab';

function Login() {
    const userDispatch = useAuthDispatch();
    const { loading, errorMessage, isAuthenticated } = useAuthState();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(userDispatch, email, password);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <>
            <Container maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Fade in={Boolean(errorMessage)}>
                        <Typography color="error">
                            {errorMessage}
                        </Typography>
                    </Fade>

                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Oturum Aç
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            id="email"
                            label="E-posta Adresiniz"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            name="password"
                            id="password"
                            label="Parola"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <Grid container sx={{ mt: 2, mb: 3 }}>
                            <Grid item xs>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Beni hatırla"
                                />
                            </Grid>
                            <Grid item>
                                <LoadingButton
                                    size="small"
                                    loadingPosition="end"
                                    variant="contained"
                                    loading={loading}
                                    endIcon={<SendIcon />}
                                    onClick={e => handleSubmit(e)}
                                    disabled={!email || !password}>
                                    Oturum Aç
                                </LoadingButton>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Şifrenizi mi unuttunuz?
                                </Link>
                            </Grid>
                            <Grid item>
                                <RaouteLink to="/signup" variant="body2">
                                    {"Hesabınız yok mu? Kaydol"}
                                </RaouteLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Login