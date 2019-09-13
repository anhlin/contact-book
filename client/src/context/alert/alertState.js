import React, { useReducer } from 'react';
import uuid from 'uuid';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

//Set initial state
const AlertState = props => {
    const initialState = [];

    //Allows us to access state and dispatch objects to reducer
    const [state, dispatch] = useReducer(AlertReducer, initialState);

    //Set alert
    const setAlert = (msg, type, timeout = 5000) => {
        const id = uuid.v4();
        dispatch({ type: SET_ALERT, payload: { msg, type, id } });
        setTimeout(
            () => dispatch({ type: REMOVE_ALERT, payload: id }),
            timeout
        );
    };

    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
