// #!/usr/bin/env node
import { app } from '../app';
import { WebServer } from '../core/web-server';
import { WebsocketServer } from '../core/websocket-server';

const webServer = new WebServer(app);
const websocketServer = new WebsocketServer(webServer.server);

// create closure for node server (hook for running under the electron environment)
module.exports = {
  webServer,
  websocketServer
};
