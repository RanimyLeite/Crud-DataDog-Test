'use strict'

const tracer = require('dd-trace').init({
  logs_enabled: true,
});
const { createLogger, format, transports } = require('winston');
const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');
const { Console } = require('console');

const app = express();
const port = 3000;
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: `./logs/logz.log` }),
  ],
});

const route = router.get('/', (req, res) => {
  const token = req.headers.token;

  if(!token){
    logger.error("Error test");
    res.status(500).json({
      message: "Expected token parameter in headers!"
    });
  }

  logger.info("Success");
  res.status(200).send({
    title: "Node API",
    version: "0.0.1",
    status: "Ok"
  });
});
app.use('/info', route);

server.listen(port);
console.log('API running on port ' + port);
