# Peek – database discovery and query building for mongoDB

<img src="peek_logo.png" width="100"/>

Peek is a proof of concept for a database discovery tool, which is also capable of generating
MQL (mongoDB Query Language) queries.

**Features:**

- connect to your mongoDB database *
- infer schema for a chosen collection
- visualize aggregations for chosen keys
- generate queries, based on chosen key configurations


*only username / password authentication supported

A project by Marlin Jai Pohl, Leif Benedikt Rehtanz, Tobias Bayer, Laura Bärtschi, Matthis Ehrhardt, Alexej Bormatenkow

Developed during the winter term of 2023/24 as part of the International Media and Computing BSc programe.


## Installation

**Prerequisites**
* Docker Desktop > 4.24


Create a Docker image and run it with the following command:
```bash
docker compose up --build
```
## Project structure

After successfully building the project consists of several Docker containers

### frontend

* React dev environment with hot reloading
* Port 3000 is exposed
* Open http://localhost:3000 in browser
* [📘 Frontend Manual](./frontend/readme.md)

### backend
* Node.js / Express server
* Port 4000 is exposed
* API endpoints are exposed at http://localhost:4000/
* [📘 Backend Manual](./backend/readme.md)

### reverse proxy
* Nginx server
* Basic reverse proxy config, mapping http port 3000 to port 80
* Frontend is served through nginx @ http://localhost
* [🛠️ Nginx Docs: Reverse Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

### mongoDB
* MongoDB database
* Default Port 27017 is exposed
* A persistent Docker volume `mongodb-data` for databases 
