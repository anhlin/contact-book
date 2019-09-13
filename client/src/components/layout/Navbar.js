import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuth, logout } = authContext;
    const { clearContacts } = contactContext;

    const logoutAndClear = () => {
        logout();
        clearContacts();
    };

    const authLinks = (
        <Fragment>
            <li>
                <a onClick={logoutAndClear} href="#!">
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const links = (
        <Fragment>
            <li>
                <Link to="/register"> Register </Link>
            </li>
            <li>
                <Link to="/login"> Login </Link>
            </li>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary navbar-dark navbar-expand-md py-0">
            <h3>
                <i className={icon} /> {title}
            </h3>
            <ul className="pt-3">{isAuth ? authLinks : links}</ul>
        </div>
    );
};

Navbar.defaultProps = {
    title: 'Contact Book',
    icon: 'fas fa-id-card-alt'
};

export default Navbar;
