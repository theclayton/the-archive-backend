const express = require('express');
const expressServer = express();

require('./start/routes')(expressServer);
require('./start/db')();

const port = process.env.PORT || 3000;
const server = expressServer.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;

// Set environment variables:
// set MONGO_URI=mongodb://localhost/archive
// set JWT_PRIVATE_KEY=1234
/// on Mac:
// export MONGO_URI=mongodb://localhost/archive
// export JWT_PRIVATE_KEY=1234