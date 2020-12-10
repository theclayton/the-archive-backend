# The Archive Backend by Clayton Ward
[Go to frontend repository](https://github.com/theclayton/the-archive)

The Archive Backend is a RESTful API I built, running Express and MongoDB. Feel free to explore the API and cURL some endpoints. The [frontend](https://github.com/theclayton/the-archive) of this site is served with one of my Apache Linux servers, which I also use for my freelance work and company Flare Software LC. The backend is served from a Google Cloud Platform Debian Linux instance running a reverse proxy with Nginx (mostly for TLS encryption reasons) and a NodeJS instance, monitored with PM2. MongoDB is used to store all Archive data. File uploads are stored on the server and served with the same ExpressJS server process as the API, for simplicity and speed.
