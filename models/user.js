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
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_WEB_TOKEN);
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    let error

    if (!user.name) {
        error = { status: 400, message: 'Name is required.' }
    }
    if (!user.email) {
        error = { status: 400, message: 'Email is required.' }
    }
    if (!user.password || user.password.length < 5) {
        error = { status: 400, message: 'Password is required and must be between 5 and 1024 characters long.' }
    }

    return error
}

exports.User = User;
exports.validate = validateUser;