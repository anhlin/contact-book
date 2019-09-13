import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();
        //eslint-disable-next-line
    }, []);

    return (
        <div className="row">
            <div className="col-12">
                <div className="card-body border rounded mx-5">
                    <div>
                        <ContactForm></ContactForm>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card-body mt-4 border rounded mx-5">
                    <ContactFilter />

                    <Contacts />
                </div>
            </div>
        </div>
    );
};

export default Home;
