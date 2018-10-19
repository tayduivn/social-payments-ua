import {
  IncomingMessage,
  OutgoingHttpHeaders,
  Server as HttpServer
} from 'http';
import { Server as HttpsServer } from 'https';
import * as WebSocket from 'ws';
import { Server as WsServer } from 'ws';
import { Token } from './token';

type HeartbeatWebSocket = WebSocket & {isAlive: boolean};
type VerifyClientInfo = { origin: string; secure: boolean; req: IncomingMessage };
type VerifyClientCallback = (res: boolean, code?: number, message?: string, headers?: OutgoingHttpHeaders) => void;

export class WebsocketServer {
  public readonly server: WsServer;

  private heartBeatTimer: NodeJS.Timer;

  constructor(server: HttpServer | HttpsServer) {
    this.server = new WsServer({
      server,
      verifyClient: WebsocketServer.verifyClient
    });

    this.initServerEvent();
    this.initHeartBeat();
  }

  private static verifyClient(info: VerifyClientInfo, cb: VerifyClientCallback): void {
    Token.isExpired(info.req.headers['sec-websocket-protocol'] as string)
      .then(expired => expired ? cb(false, 401, 'Unauthorized') : cb(true))
  }

  private static onConnection(ws: HeartbeatWebSocket) {
    console.log('!!!!!!!!!!!!!!!!!!!! WS connected');
    ws.send(JSON.stringify({message: 'hello mf refactored'}));

    ws.on('message', (msg: string) => {
      ws.send(JSON.stringify({echo: msg}));
    });

    ws.isAlive = true;
    ws.on('pong', () => {
      console.log('pong');
      ws.isAlive = true;
    });

    ws.on('close', () => console.log('~~~~~~~~~~~~~~~~~~~~~WS client disconnected'));
  }

  private initServerEvent(): void {
    this.server.on('connection', WebsocketServer.onConnection);
    this.server.on('close', () => clearInterval(this.heartBeatTimer));
  }

  private initHeartBeat(): void {
    this.heartBeatTimer = setInterval(() => {
      this.server.clients.forEach((ws: HeartbeatWebSocket) => {
        if (ws.isAlive === false) {
          return ws.terminate();
        }

        ws.isAlive = false;
        console.log('ping');
        ws.ping();
      });
    }, 20 * 1000);
  }
}
