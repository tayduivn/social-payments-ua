import * as WebSocket from 'ws';
import { Server } from 'ws';
import { Token } from '../core/token';

type HeartbeatWebSocket = WebSocket & {isAlive: boolean};

const onConnection = (ws: HeartbeatWebSocket) => {
  console.log('!!!!!!!!!!!!!!!!!!!! WS connected');
  ws.send(JSON.stringify({message: 'hello mf'}));

  ws.on('message', (msg: string) => {
    ws.send(JSON.stringify({echo: msg}));
  });

  ws.isAlive = true;
  ws.on('pong', () => {
    console.log('pong');
    ws.isAlive = true;
  });

  ws.on('close', () => console.log('~~~~~~~~~~~~~~~~~~~~~WS client disconnected'));
};

export const initWebSocket = (server: any): void => {
  const webSocketServer = new Server({
    server,
    verifyClient: (info, cb) => Token.isExpired(info.req.headers['sec-websocket-protocol'] as string)
      .then(expired => expired ? cb(false, 401, 'Unauthorized') : cb(true))
  });

  webSocketServer.on('connection', onConnection);

  const interval = setInterval(() => {
    webSocketServer.clients.forEach((ws: HeartbeatWebSocket) => {
      if (ws.isAlive === false) {
        return ws.terminate();
      }

      ws.isAlive = false;
      console.log('ping');
      ws.ping();
    });
  }, 20 * 1000);

  webSocketServer.on('close', () => clearInterval(interval));
};
