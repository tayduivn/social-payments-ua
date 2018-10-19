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

  private static readonly tokenHeaderName = 'sec-websocket-protocol';

  private static readonly heartBeatInterval: number = 20 * 1000;
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
    Token.isExpired(info.req.headers[WebsocketServer.tokenHeaderName] as string)
      .then(expired => expired ? cb(false, 401, 'Unauthorized') : cb(true))
  }

  private static clientConnection(ws: HeartbeatWebSocket) {
    ws.isAlive = true;
    ws.on('pong', () => ws.isAlive = true);

    ws.on('message', (msg: string) => ws.send(JSON.stringify({echo: msg})));
  }

  private initServerEvent(): void {
    this.server.on('connection', WebsocketServer.clientConnection);
    this.server.on('close', () => clearInterval(this.heartBeatTimer));
  }

  private initHeartBeat(): void {
    this.heartBeatTimer = setInterval(this.heartBeat.bind(this), WebsocketServer.heartBeatInterval);
  }

  private heartBeat() {
    this.server.clients.forEach((ws: HeartbeatWebSocket) => {
      if (ws.isAlive === false) {
        return ws.terminate();
      }

      ws.isAlive = false;
      ws.ping();
    });
  }
}
