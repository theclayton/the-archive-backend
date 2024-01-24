const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('./models/user');

module.exports = async function () {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log(`Connected to database...`)

        const users = await User.find();

        if (users.length < 1) {
            // Create default admin user
            console.log('Creating default admin user...');

            const newUser = new User({ name: 'Admin', email: 'admin@flaresoftware.com', password: 'password', authLevel: 'Admin' });

            const salt = await bcrypt.genSalt(16);
            newUser.password = await bcrypt.hash(newUser.password, salt);
            await newUser.save();

            console.log('Default admin user created.\nLogin with the following:\n\nemail: admin@flaresoftware.com\npassword: password\n-----')

        }

    } catch (err) {
        console.log(`DB Connection Error: ${err.message}`);
    }
}