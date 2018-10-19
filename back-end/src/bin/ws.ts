import * as WebSocket from 'ws';
import { Server } from 'ws';
import { Token } from '../core/token';

export const initWebSocket = (server: any): void => {
  const webSocketServer = new Server({
    server,
    verifyClient: (info, cb) => Token.isExpired(info.req.headers['sec-websocket-protocol'] as string)
      .then(expired => expired ? cb(false, 401, 'Unauthorized') : cb(true))
  });

  webSocketServer.on('connection', (ws: WebSocket) => {
    console.log('!!!!!!!!!!!!!!!!!!!! WS connected');

    ws.on('message', (msg: string) => {
      console.log('--- message received', msg);
      ws.send(JSON.stringify({echo: msg}));
    });

    ws.send(JSON.stringify({message: 'hello mf'}));

    ws.on('close', () => console.log('~~~~~~~~~~~~~~~~~~~~~Client disconnected'));
  });
};
