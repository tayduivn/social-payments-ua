// #!/usr/bin/env node

/**
 * Module dependencies.
 */

import fs from 'fs';
import http from 'http';
import https from 'https';
import { app } from '../app';

const debug = require('debug')('express-g:server');

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val: number | string): number | string | boolean => {
  const port = parseInt(val as string, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('Listening on ' + bind);
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '443');
app.set('port', port);

/**
 * Create HTTPS server.
 */

const sslOptions = {
  key: fs.readFileSync('../cert/key.pem'),
  cert: fs.readFileSync('../cert/cert.pem'),
  passphrase: 'spua'
};

const server = process.env.HEROKU ? http.createServer(app) : https.createServer(sslOptions, app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// create closure for node server (hook for running under the electron environment)
module.exports = server;
