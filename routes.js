const express = require('express');
const helmet = require("helmet");
const projectsRoute = require('./routes/projects');
const searchRoute = require('./routes/search');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const fileUpload = require('express-fileupload');
const uploadRoute = require('./routes/upload');
const error = require('./middleware/error');


module.exports = function(app) {
    app.use(helmet());
    app.use(express.json());
    app.use(express.static('uploads'));
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, archive-token")
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        next()
    });
    app.use('/api/projects', projectsRoute);
    app.use('/api/search', searchRoute);
    app.use('/api/users', usersRoute);
    app.use('/api/auth', authRoute);
    app.use(fileUpload());
    app.use('/api/upload', uploadRoute);
    app.use(error);
}