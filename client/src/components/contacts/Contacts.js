import React, { Fragment, useContext, useEffect } from 'react';
import ContactInst from './ContactInst';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';

import Spinner from '../layout/Spinner';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, getContacts, loading, filtered } = contactContext;

    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, []);

    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h3> No Contacts </h3>;
    }

    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                    {filtered !== null
                        ? filtered.map(contact => (
                              <CSSTransition
                                  key={contact._id}
                                  timeout={700}
                                  classNames="item"
                              >
                                  <ContactInst contact={contact}></ContactInst>
                              </CSSTransition>
                          ))
                        : contacts.map(contact => (
                              <CSSTransition
                                  key={contact._id}
                                  timeout={700}
                                  classNames="item"
                              >
                                  <ContactInst contact={contact}></ContactInst>
                              </CSSTransition>
                          ))}
                </TransitionGroup>
            ) : (
                <Spinner />
            )}
        </Fragment>
    );
};

export default Contacts;
