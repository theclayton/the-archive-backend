const express = require('express');
const projectsRoute = require('../routes/projects');
const usersRoute = require('../routes/users');
const authRoute = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
	app.use((req, res, next) => {
	  res.setHeader("Access-Control-Allow-Origin", "*")
	  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, archive-token")
	  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	  next()
	});
    app.use('/api/projects', projectsRoute);
    app.use('/api/users', usersRoute);
    app.use('/api/auth', authRoute);
    app.use(error);
}