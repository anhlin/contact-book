const jwt = require('jsonwebtoken');
const config = require('config');

//For protected routes
module.exports = function(req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, auth denied' });
    }

    try {
        //Verify user and extract payload
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //Set req.user to the extracted user
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};
