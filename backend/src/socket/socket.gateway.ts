import { Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Server, Socket } from 'socket.io';
import { SocketManager } from 'src/socket/socket.manager';
import { Logger } from 'winston';

@WebSocketGateway({
  path: '/bingo-socket',
  allowEIO3: true,
  cors: {
    origin: true,
    credentials: true
  }
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly socketManager: SocketManager
  ) {}

  afterInit(server: Server) {
    this.socketManager.setServer(server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.socketManager.addSocket(client);
    this.logger.info(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.socketManager.removeSocket(client);
    this.logger.info(`Client disconnected: ${client.id}`);
  }
}
