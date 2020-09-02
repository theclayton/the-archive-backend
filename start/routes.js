const express = require('express');
const projectsRoute = require('../routes/projects');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/projects', projectsRoute);
    app.use(error);
}