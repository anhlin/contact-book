import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                loading: false
            };
        case LOGOUT:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuth: false,
                loading: false,
                user: null,
                error: action.payload
            };
        case USER_LOADED:
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
    }
};
