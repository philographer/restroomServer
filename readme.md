# Restroom Server v1.0.0
The Easiest way to find Restroom

[![Node](https://img.shields.io/badge/Node-v4.4.7-brightgreen.svg)](https://img.shields.io/badge/Node-v4.4.7-brightgreen.svg)
[![AWS](https://img.shields.io/badge/AWS-EC2%20%7C%20RDS-brightgreen.svg)](https://img.shields.io/badge/AWS-EC2%20%7C%20RDS-brightgreen.svg)
[![Platform](https://img.shields.io/badge/Platform-Ubuntu%20v14.04-lightgrey.svg)](https://img.shields.io/badge/Platform-Ubuntu%20v14.04-lightgrey.svg)

![Poster](https://s32.postimg.org/c4m0s2ftx/server.png)

Restroom Server used for Find nearest restroom written in Node v4.4.7

## Server Getting Started
```bash
$ npm install
```
```bash
$ node bin/www
```

## Essential Features

- [x] Include App & Server communication logic
- [x] Play time saving (In my app, Save Auth_token & Review)
- [x] Social authentication service(facebook auth)
- [x] google Play store uploaded
- [x] Deploy on the cloud server (Using AWS EC2, RDS)
- [x] HTTP Response Validation
- [x] Using Database Query (Using Postgres)
- [x] Web server (node.js, AWS EC2 t2.micro Ubuntu 14.04)

## Additional Features
- [x] Using cloud service(AWS EC2, RDS)
- [x] Add Friend, Ranking, Gift (In my app, Add review, Request new restroom)
- [x] Restrful Api Design (Node.js)
- [ ] Push Notification
- [x] Hybrid Application(IOS, Android)
- [ ] CMS Service

## Used
* [express](http://expressjs.com/) - Node.js web application framework
* [pg](https://github.com/brianc/node-postgres) - PostgreSQL client for node.js.
* [sequelize](http://docs.sequelizejs.com/en/latest/) - Sequelize is a promise-based ORM for Node.js and io.js. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
* [cors](https://github.com/expressjs/cors) - A node.js package that provides an Express/Connect middleware to enable Cross Origin Resource Sharing (CORS) with various options. https://npmjs.org/package/cors
* [node-jsonfile](https://github.com/jprichardson/node-jsonfile) - Easily read/write JSON files.
* [request](https://github.com/request/request) - Simplified HTTP request client.
* [q](https://github.com/kriskowal/q) - A promise library for JavaScript http://documentup.com/kriskowal/q/

## Database Structure
[![db](https://s32.postimg.org/67sfxlw85/2016_07_25_12_10_03.png)](https://s32.postimg.org/67sfxlw85/2016_07_25_12_10_03.png)

## Development Env
- Dev: Mac OS X 10.11 / Webstorm / Android Studio / Xcode / DataGrip / Postman
- Database: AWS RDS PostgreSQL 9.5.2
- Server: Node v4.4.7
- Server Env: AWS EC2 t2.micro Linux 14.04
- Client: Ionic 1.3

## License
Restroom App is released under the MIT license. See LICENSE for details.
