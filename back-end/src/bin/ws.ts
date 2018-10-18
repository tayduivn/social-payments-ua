import * as WebSocket from 'ws';
import { Server } from 'ws';

export const initWebSocket = (server: any): void => {
  const webSocketServer = new Server({server});

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
