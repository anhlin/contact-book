import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        //delete if not token passed in
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;
