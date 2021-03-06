const { User, validateUser } = require('../models/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


router.get('/', auth, admin, asyncHandler(async(req, res) => {
    const users = await User.find();

    res.send({ message: "success", users: users });
}));

router.post('/create', auth, admin, asyncHandler(async(req, res) => {
    const error = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(403).send('User already registered.');

    const newUser = new User({ name: req.body.name, email: req.body.email, password: req.body.password, authLevel: req.body.authLevel });

    const salt = await bcrypt.genSalt(16);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();

    res.send({ message: "success" });
}));

router.put('/', auth, admin, asyncHandler(async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(403).send('User does not exist.');

    user.name = req.body.name;
    user.authLevel = req.body.authLevel;

    await user.save();

    res.send({ message: "success" });
}));

router.delete('/:email', auth, admin, asyncHandler(async(req, res) => {
    const email = String(decodeURI(req.params.email));

    const user = await User.findOne({ email: email });
    if (!user) return res.status(403).send('User does not exist.');

    await User.deleteOne({ email: email })

    res.send({ message: "success" });
}));


router.put('/change-password', auth, asyncHandler(async(req, res) => {
    const email = req.body.email
    if (!email) return res.status(400).send({ message: 'Email is required.' });
    // SPECIAL CASE
    if (email === "guest@flaresoftware.com") return res.status(403).send({ message: "This account's password cannot be changed." })

    const password = req.body.password
    if (!password || password.length < 5) return res.status(400).send({ message: 'Password is required and must be less than 5 characters long.' });

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "User does not exist." });

    const salt = await bcrypt.genSalt(16);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send({ message: "success" });
}));


module.exports = router;