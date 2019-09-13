import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
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

//Set initial state
const AuthState = props => {
    const initialState = {
        user: null,
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null
    };

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //Allows us to access state and dispatch objects to reducer
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Load user
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    };

    //Register User
    const register = async data => {
        try {
            const res = await axios.post('/api/users', data, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    //Login User
    const login = async data => {
        try {
            const res = await axios.post('/api/auth', data, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    //Logout
    const logout = () => {
        dispatch({ type: LOGOUT });
    };
    //Clear Errors
    const clearErr = () => {
        dispatch({
            type: CLEAR_ERRORS
        });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuth: state.isAuth,
                user: state.user,
                loading: state.loading,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErr
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
