import axios from 'axios';
import logger from "../../utils/logger";

import {
    START_LOADING,
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

import CONFIG from '../../config';

const parseError = (err) => {
    const errorText = (err.response ?
        (err.response.data.error + ': ' + err.response.data.message) :
        (err.toJSON().name + ': ' + err.toJSON().message)
    );

    return errorText;
};

export const testCallback = async (dispatch, email, password, name) => {
    dispatch({ type: START_LOADING });
    logger('--------1--------', 'w')

    setTimeout(() => {
        dispatch({ type: AUTHENTICATED_FAIL });
        // dispatch({ type: SIGNUP_FAIL, errorMessage: 'Hata :(' });
        logger('--------2--------', 'w')
    }, 1000);
};

export const checkAuthenticated = async (dispatch, isPrivate, path, history) => {
    if (typeof window == 'undefined') {
        dispatch({ type: AUTHENTICATED_FAIL });
    }

    if (localStorage.getItem('accessToken')) {
        dispatch({ type: START_LOADING });
        // logger('Kullanıcı kontrol ediliyor...', 'd');

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('accessToken')}`,
            }
        };

        try {
            const res = await axios.get(`${CONFIG.apiUrl}/auth/me`, config);

            dispatch({
                type: AUTHENTICATED_SUCCESS
            });

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            // logger(AUTHENTICATED_FAIL, 'e')

            dispatch({ type: AUTHENTICATED_FAIL, errorMessage: parseError(err) });

            // isPrivate && 
            if (path !== '/signin') {
                history.push('/signin');
            }

        }
    } else {
        // logger('AccessToken notfound', 'e')
        dispatch({
            type: AUTHENTICATED_FAIL,
            // errorMessage: 'AccessToken is required!'
        });
    }
};

export const loginUser = async (dispatch, email, password) => {
    dispatch({ type: START_LOADING });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${CONFIG.apiUrl}/auth/login`, body, config)

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

export const signupUser = async (dispatch, email, phone, first_name, last_name, password, re_password) => {
    dispatch({ type: START_LOADING });
    const config = { headers: { 'Content-Type': 'application/json' } }

    const body = JSON.stringify({ email, phone, first_name, last_name, password, re_password });

    try {
        const res = await axios.post(`${CONFIG.apiUrl}/auth/register`, body, config);

        dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: SIGNUP_FAIL, errorMessage: parseError(err) });
    }
};

export const verify = (uid, token) => async dispatch => {
    dispatch({ type: START_LOADING });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token });

    try {
        const res = await axios.post(`${CONFIG.apiUrl}/auth/users/activation`, body, config);

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
    dispatch({ type: START_LOADING });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${CONFIG.apiUrl}/auth/users/reset_password`, body, config);
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
        const res = await axios.post(`${CONFIG.apiUrl}/auth/users/reset_password_confirm`, body, config);

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
    dispatch({ type: START_LOADING });
    dispatch({ type: LOGOUT });
};