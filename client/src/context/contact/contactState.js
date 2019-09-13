import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CONTACTS,
    GET_CONTACTS,
    UPDATE_CONTACT,
    CLEAR_FILTER,
    FILTER_CONTACTS,
    CLEAR_CURRENT,
    CONTACT_ERROR
} from '../types';

//Set initial state
const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    //Allows us to access state and dispatch objects to reducer
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //Get contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    //Add contact
    const addContact = async contact => {
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    //Delete contact
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    //Set current contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };
    //Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    //update contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(
                `/api/contacts/${contact._id}`,
                contact,
                config
            );

            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS
        });
    };

    //Filter contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };

    //Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                filtered: state.filtered,
                current: state.current,
                error: state.error,
                getContacts,
                clearContacts,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
