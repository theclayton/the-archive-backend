const express = require('express');
const projectsRoute = require('../routes/projects');
const usersRoute = require('../routes/users');
const authRoute = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/projects', projectsRoute);
    app.use('/api/users', usersRoute);
    app.use('/api/auth', authRoute);
    app.use(error);
}