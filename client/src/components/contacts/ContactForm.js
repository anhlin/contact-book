import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    //Need context to submit and change overall state
    const contactContext = useContext(ContactContext);
    const { addContact, updateContact, clearCurrent, current } = contactContext;
    //Need component level state because it's a form
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current]); // If these change

    //Set contact state to prev state with new value
    const onFormChange = event =>
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        });

    const onFormSubmit = event => {
        event.preventDefault();
        if (current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        });
    };

    const clearAll = () => {
        clearCurrent();
    };

    return (
        <form onSubmit={onFormSubmit}>
            <h2 className="text-primary">
                {current ? 'Edit Contact' : 'Add Contact'}
            </h2>
            <input
                type="text"
                placeholder="name"
                name="name"
                value={name}
                onChange={onFormChange}
            ></input>
            <input
                type="email"
                placeholder="email"
                name="email"
                value={email}
                onChange={onFormChange}
            ></input>
            <input
                type="text"
                placeholder="phone"
                name="phone"
                value={phone}
                onChange={onFormChange}
            ></input>
            <h4>Contact Type</h4>
            <input
                type="radio"
                name="type"
                value="personal"
                checked={type === 'personal'}
                onChange={onFormChange}
            ></input>{' '}
            Personal
            <input
                type="radio"
                name="type"
                value="professional"
                checked={type === 'professional'}
                onChange={onFormChange}
            ></input>{' '}
            Professional
            <div>
                <input
                    type="submit"
                    value={current ? 'Update' : 'Save'}
                    className="btn-btn-primary btn-block"
                ></input>
            </div>
            {current && (
                <div>
                    <button
                        className="btn btn-light btn-block"
                        onClick={clearAll}
                    >
                        {' '}
                        Cancel{' '}
                    </button>
                </div>
            )}
        </form>
    );
};

export default ContactForm;
