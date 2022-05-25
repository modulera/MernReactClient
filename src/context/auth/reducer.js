/* eslint-disable no-unused-vars */
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
} from './types';

export const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: false,
  user: null,
  loading: true,
  errorMessage: null,
  msg: null,
};

export const AuthReducer = (state = initialState, action) => {

  switch (action.type) {
    case "START_LOADING":
      return {
        ...initialState,
        loading: true
      };
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('accessToken', action.payload.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      }
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      }
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        errorMessage: action.errorMessage
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.msg
      }
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null
      }
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return {
        ...state,
        loading: false,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        user: null,
        errorMessage: action.errorMessage

      }
    default:
      return state
  }

};
