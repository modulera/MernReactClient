import axios from 'axios';

import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
    LOGOUT,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS
} from './types';

const baseURL = "http://127.0.0.1:8080/api";

const parseError = (err) => {
    const errorText = (err.response ?
        (err.response.data.error + ': ' + err.response.data.message) :
        (err.toJSON().name + ': ' + err.toJSON().message)
    );

    return errorText;
};

export const checkAuthenticated = async (dispatch, isPrivate, path, history) => {
    if (typeof window == 'undefined') {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    if (localStorage.getItem('accessToken')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('accessToken')}`,
            }
        };

        try {
            const res = await axios.get(`${baseURL}/auth/me`, config);

            dispatch({
                type: AUTHENTICATED_SUCCESS
            });

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL,
                errorMessage: parseError(err)
            });

            // isPrivate && 
            if (path !== '/login') {
                history.push('/login');
            }

        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL,
            // errorMessage: 'AccessToken is required!'
        });
    }
};

export const load_user = async (dispatch) => {
    if (localStorage.getItem('accessToken')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('accessToken')}`
            }
        };

        try {
            const res = await axios.get(`${baseURL}/auth/me`, config);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL,
                errorMessage: parseError(err)
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL,
            // errorMessage: err
        });
    }
}

export const loginUser = async (dispatch, email, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${baseURL}/auth/login`, body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch({
            type: USER_LOADED_SUCCESS,
            payload: res.data.user
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            errorMessage: parseError(err)
        });
    }
};

export const signup = async (dispatch, username, email, phone, first_name, last_name, password, re_password) => {
    dispatch({
        type: 'START_LOADING'
    });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, email, phone, first_name, last_name, password, re_password });

    try {
        const res = await axios.post(`${baseURL}/auth/register`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL,
            errorMessage: parseError(err)
        });
    }
};

export const verify = (uid, token) => async dispatch => {
    dispatch({
        type: 'START_LOADING'
    });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token });

    try {
        const res = await axios.post(`${baseURL}/auth/users/activation`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL,
            errorMessage: parseError(err)
        });
    }
};

export const resetPassword = async (dispatch, email) => {
    dispatch({
        type: 'START_LOADING'
    });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${baseURL}/auth/users/reset_password`, body, config);
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            msg: "Email has been sent! Check your email for further direction."
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            errorMessage: parseError(err)
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        const res = await axios.post(`${baseURL}/auth/users/reset_password_confirm`, body, config);

        dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL,
            errorMessage: parseError(err)
        });
    }
};

export const logout = async (dispatch) => {
    dispatch({
        type: 'START_LOADING'
    });
    dispatch({ type: LOGOUT });
};