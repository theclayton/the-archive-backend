const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    authLevel: {
        type: String,
        required: true
    }
});


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ name: this.name, authLevel: this.authLevel }, process.env.JWT_PRIVATE_KEY, { expiresIn: '8hr' });
    return token;
}

const User = mongoose.model('User', userSchema);

function getTokenInfo(token) {
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    const userData = { message: "success", name: decodedToken.name, authLevel: decodedToken.authLevel }

    if (userData) {
        return userData
    }
    return { message: "failed" }
}


function validateUser(user) {
    let error

    if (!user.name) error = { status: 400, message: 'Name is required.' }
    if (!user.email) error = { status: 400, message: 'Email is required.' }
    if (!user.password || user.password.length < 5) error = { status: 400, message: 'Password is required and must be between 5 and 1024 characters long.' }
    if (!user.authLevel) error = { status: 400, message: 'Auth Level is required.' }

    return error
}

function validateLoginCreds(user) {
    let error

    if (!user.email) error = { status: 400, message: 'Email is required.' }
    if (!user.password || user.password.length < 5) error = { status: 400, message: 'Password must be at least 5 characters long.' }

    return error
}

exports.User = User;
exports.getTokenInfo = getTokenInfo;
exports.validateUser = validateUser;
exports.validateLogin = validateLoginCreds;