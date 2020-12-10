# the-archive-backend
[Go to frontend repository](https://github.com/theclayton/the-archive)

Backend API for The Archive. A resource for viewing projects by Clayton Ward. Built with ExpressJS, the live server is running on a Google Cloud Platform Debian Linux instance running a reverse proxy with nginx (mostly for TLS encryption) and a NodeJS insatnce monitored with PM2. MongoDB is used to store all archive data. File uploads are stored on the server and served with the same node/express server process as the API for simplicity and speed.
