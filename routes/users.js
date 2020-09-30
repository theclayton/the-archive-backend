const { User, validateUser } = require('../models/user');
const auth = require('../middleware/auth');
const asyncHandler = require('express-async-handler')
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/me', auth, asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}));

router.get('/', auth, asyncHandler(async(req, res) => {
    const users = await User.find();

    res.send({ message: "success", users: users });
}));

router.post('/create', asyncHandler(async(req, res) => {
    // TODO: ADD AUTHORIZATION

    const error = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(403).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'authLevel']));
    const salt = await bcrypt.genSalt(16);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send({ message: "success", user: user });
}));

router.put('/', auth, asyncHandler(async(req, res) => {
    // TODO: ADD ADMIN ONLY AUTHORIZATION AND VALIDATION

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(403).send('User does not exist.');

    user.name = req.body.name;
    user.authLevel = req.body.authLevel;

    await user.save();

    res.send({ message: "success", user: user });
}));

router.delete('/', auth, asyncHandler(async(req, res) => {
    // TODO: ADD ADMIN ONLY AUTHORIZATION AND VALIDATION

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(403).send('User does not exist.');

    await User.deleteOne({ email: req.body.email })

    res.send({ message: "success", user: user });
}));

module.exports = router;