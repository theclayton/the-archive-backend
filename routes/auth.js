const { User, validateLogin, getTokenInfo } = require('../models/user');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/login', asyncHandler(async(req, res) => {
    const tokenExpiresIn = 28800000 // 8 hours

    const error = validateLogin(req.body);
    if (error) return res.status(400).send({ message: error.message });

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Invalid email or password." });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Invalid email or password." });

    const token = user.generateAuthToken();
    res.send({ message: "success", expiresIn: tokenExpiresIn, token: token, name: user.name, email: user.email, authLevel: user.authLevel });
}));


router.post('/login/getinfo', asyncHandler(async(req, res) => {
    const token = req.body.token;
    if (!token) return res.status(400).send({ message: 'Token is required.' });

    const userData = getTokenInfo(token)

    res.send(userData);
}));


module.exports = router;