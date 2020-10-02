const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => console.log(`Connected to database...`))
        .catch(err => {
            console.log(`DB Connection Error: ${ err.message }`);
        });
}