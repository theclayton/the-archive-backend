# The Archive Backend

The Archive Backend is used to display your technology portfolio. This project contains a RESTful API, running Express. MongoDB is used to store all Archive data, except for file uploads, which are stored on the server (This will be moved somewhere more scalable, eventually). There is an accompanying [frontend](https://github.com/theclayton/the-archive) project built using Angular. 


## Prerequisites

- Set environment variables in the `.env` file. 
- You will need access to a MongoDB instance, you can quickly set one up with docker:
`docker run --name mongodb -d -p 27017:27017 mongo:6.0.13`. Note you will need to setup Docker networking if running both MongoDB and server containers on the same machine.
- You can either run the server using Docker or using the `node server.js` command.


## Getting started

Install dependencies by running:
```bash
npm i
```
Build docker container:

```bash
npm run build
```

Run docker container:
```bash
npm run start
```
The server should now be listening on port <i>3000</i>. You can ensure this by using the healthcheck endpoint:
```bash
curl 'http://localhost:3000/healthcheck'
```
Should return status 200 with text body containing `OK`


## Basic Usage

On startup, a new admin user should have been created with the following credentials:

```yml
email: admin@flaresoftware.com
password: password
```

You can use these credentials to login and create other users, create and anage projects, etc.
