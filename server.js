const express = require('express');
const expressServer = express();

require('./start/routes')(expressServer);
require('./start/db')();

const port = process.env.PORT || 3000;
const server = expressServer.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;