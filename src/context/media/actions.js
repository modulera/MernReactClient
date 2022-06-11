import axios from 'axios';
import logger from "../../utils/logger";

import {
    START_LOADING,
    MEDIAS_LOADED_FAIL,
    MEDIAS_LOADED_SUCCESS,
} from './types';

import CONFIG from '../../config';

const parseError = (err) => {
    const errorText = (err.response ?
        (err.response.data.error + ': ' + err.response.data.message) :
        (err.toJSON().name + ': ' + err.toJSON().message)
    );

    return errorText;
};

export const loadFiles = async (dispatch) => {
    dispatch({ type: START_LOADING });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('accessToken')}`,
        }
    };

    try {
        const res = await axios.get(`${CONFIG.apiUrl}/media/files`, config);

        dispatch({
            type: MEDIAS_LOADED_SUCCESS,
            payload: res.data
        });

        return res.data
    } catch (err) {
        logger(err, 'e')

        dispatch({ type: MEDIAS_LOADED_FAIL, message: parseError(err) });
    }
};
