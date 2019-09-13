import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = props => {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { login, clearErr, error, isAuth } = authContext;

    useEffect(() => {
        if (isAuth) {
            props.history.push('/');
        }
        if (error === 'Invalid Email or Password') {
            setAlert(error, 'danger');
            clearErr();
        }
        //eslint-disable-next-line
    }, [error, isAuth, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = event =>
        setUser({ ...user, [event.target.name]: event.target.value });

    const onSubmit = event => {
        event.preventDefault();
        login({
            email,
            password
        });
    };
    return (
        <div>
            <h1>
                Account <span className="text-primary">Log In</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password</label>
                    <input
                        type="text"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    ></input>
                </div>

                <input
                    type="submit"
                    value="Login"
                    className="btn btn-primary btn-block"
                ></input>
            </form>
        </div>
    );
};

export default Login;
