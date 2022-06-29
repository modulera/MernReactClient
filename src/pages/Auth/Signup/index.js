import React, { useState } from 'react';
import { Redirect, Link as RaouteLink } from 'react-router-dom';
import { signupUser, useAuthState, useAuthDispatch } from '../../../context/auth';

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

const Signup = () => {
    const userDispatch = useAuthDispatch();
    const { loading, errorMessage, isAuthenticated } = useAuthState();

    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        password: '',
        re_password: '',
    });

    const { email, phone, first_name, last_name, password, re_password } = formData;

    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        signupUser(userDispatch, email, phone, first_name, last_name, password, re_password);
    };

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
                        Kaydol
                    </Typography>
                    <Box component="form" noValidate onSubmit={e => handleSubmit(e)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="Adınız"
                                    autoFocus
                                    value={first_name || ''}
                                    onChange={e => handleOnChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Soyadınız"
                                    name="last_name"
                                    autoComplete="family-name"
                                    value={last_name || ''}
                                    onChange={e => handleOnChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="E-posta Adresiniz"
                                    name="email"
                                    autoComplete="email"
                                    value={email || ''}
                                    onChange={e => handleOnChange(e)}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-phone"
                                    name="phone"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Telefon"
                                    autoFocus
                                    value={phone || ''}
                                    onChange={e => handleOnChange(e)}
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    type="password"
                                    id="password"
                                    label="Parola"
                                    autoComplete="password"
                                    value={password || ''}
                                    onChange={e => handleOnChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    name="re_password"
                                    id="re_password"
                                    label="Parola (tekrar)"
                                    autoComplete=""
                                    value={re_password || ''}
                                    onChange={e => handleOnChange(e)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container sx={{ mt: 2, mb: 3 }}>
                            <Grid item xs>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Kullanım koşullarını kabul ediyorum."
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
                                    Kaydol
                                </LoadingButton>
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <RaouteLink to="/signin" variant="body2">
                                    Oturum Aç
                                </RaouteLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );

};

export default Signup;