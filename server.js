const express = require('express');
const expressServer = express();

require('./routes')(expressServer);
require('./db')();

const port = process.env.PORT || 3000;
const server = expressServer.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;

// Set environment variables:
// set MONGO_URI=mongodb://localhost/archive
// set JWT_PRIVATE_KEY=1234
// ***Need to create text index on db for searching. Database command:
// db.projects.createIndex( { title: "text", subtitle: "text", "technologies.name": "text" } )
//
/// on Unix:
// export MONGO_URI=mongodb://localhost/archive
// export JWT_PRIVATE_KEY=1234
//
// Production:
// export PORT=20202
// export NODE_ENV=production
// node server.js > stdout.txt 2> stderr.txt &