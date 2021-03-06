const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');

//@route   GET api/auth
//@desc    Get logged in user
//@access  private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    POST api/auth
//@desc     login user and get jwt
//@access   Public
router.post(
    '/',
    [
        check('email', 'Please include valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        //return validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            //Email not found
            if (!user) {
                return res
                    .status(400)
                    .json({ msg: 'Invalid Email or Password' });
            }

            //Check if plain text and stored passwords match
            const isMatch = await bcrypt.compare(password, user.password);

            //Invalid password entered
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ msg: 'Invalid Email or Password' });
            }

            //Get jwt
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
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
