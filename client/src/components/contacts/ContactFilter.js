import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const { filtered, filterContacts, clearFilter } = contactContext;
    const filter = useRef('');

    useEffect(() => {
        if (filtered === null) {
            filter.current.value = '';
        }
    });

    const onChange = event => {
        if (filter.current.value !== '') {
            filterContacts(event.target.value);
        } else {
            clearFilter();
        }
    };
    return (
        <form>
            <input
                ref={filter}
                type="text"
                placeholder="Filter Contacts"
                onChange={onChange}
            ></input>
        </form>
    );
};

export default ContactFilter;
