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
        <div className="container border justify-content-center p-4 mt-4">
            <h1 className="text-center">
                Account <span className="text-primary">Log In</span>
            </h1>
            <div className="row">
                <div className="col-8 m-auto">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="email"
                                required
                            ></input>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="password"
                                required
                            ></input>
                        </div>

                        <input
                            type="submit"
                            value="Login"
                            className="btn btn-block text-primary"
                        ></input>
                    </form>
                </div>
                <div className="col-12 text-center">
                    <small className="text-muted">No Account? Register! </small>
                </div>
            </div>
        </div>
    );
};

export default Login;
