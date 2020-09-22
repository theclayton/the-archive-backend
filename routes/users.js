const { User, validateUser } = require('../models/user');
const auth = require('../middleware/auth');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}));

router.post('/create', asyncHandler(async(req, res) => {
    // TODO: ADD AUTHORIZATION

    const error = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(403).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'authLevel']));
    const salt = await bcrypt.genSalt(16);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();

    res.header('archive-token', token).send(_.pick(user, ['_id', 'name', 'email', 'authLevel']));
}));

module.exports = router;