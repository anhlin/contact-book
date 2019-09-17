const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

//Register a user
// @route   POST api/users
router.post(
    '/',
    [
        check('name', 'Please enter a name.')
            .not()
            .isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        //return validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            user = new User({
                name,
                email,
                password
            });

            //Generate salt for each user's password
            const salt = await bcrypt.genSalt(10).catch(() => {
                console.log('Error generating salt');
            });

            //Hash the password with the salt
            user.password = await bcrypt
                .hash(password, salt)
                .catch(() => console.log('Error generating password'));

            await user.save().catch(() => 'Error saving to DB');

            //Generate and send JSON web token
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
