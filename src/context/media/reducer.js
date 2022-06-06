/* eslint-disable no-unused-vars */
import {
  START_LOADING,
  MEDIAS_LOADED_FAIL,
  MEDIAS_LOADED_SUCCESS,
} from './types';

export const initialState = {
  files: null,
  loading: false,
  message: null,
};

export const MediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true
      }

    case MEDIAS_LOADED_FAIL:
      return {
        ...state,
        loading: false,
        message: action.message,
        files: action.payload,
      }

    case MEDIAS_LOADED_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message,
        files: action.payload,
      }

    default:
      return state
  }

};
