const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/archive')
        .then(() => console.log(`Connected to database...`));
}