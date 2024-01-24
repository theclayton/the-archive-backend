require('dotenv').config()
const express = require('express');
const expressServer = express();

require('./routes')(expressServer);
require('./db')();

const port = process.env.PORT || 3000;
const server = expressServer.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;

// TODO: Create text index on db for searching. Database command:
// db.projects.createIndex( { title: "text", subtitle: "text", "technologies.name": "text" } )
