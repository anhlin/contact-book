import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { register, clearErr, error, isAuth } = authContext;

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    useEffect(() => {
        if (isAuth) {
            props.history.push('/');
        }
        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErr();
        }
        //eslint-disable-next-line
    }, [error, isAuth, props.history]);

    const { name, email, password, password2 } = user;

    const onChange = event =>
        setUser({ ...user, [event.target.name]: event.target.value });

    const onSubmit = event => {
        event.preventDefault();

        if (
            name === '' ||
            email === '' ||
            password === '' ||
            password2 === ''
        ) {
            setAlert('Please fill out all fields', 'danger');
            console.log('alert');
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({
                name,
                email,
                password
            });
        }
    };
    return (
        <div className="container w-50 border mt-4">
            <h1 className="text-center pt-4">
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group pt-5">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Name"
                    ></input>
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="email"
                    ></input>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                        minLength="6"
                        placeholder="Password"
                    ></input>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        placeholder="Confirm password"
                    ></input>
                </div>
                <div className="text-center w-100">
                    <input
                        type="submit"
                        value="Register"
                        className="btn btn-primary btn-block"
                    ></input>
                </div>
            </form>
        </div>
    );
};

export default Register;
