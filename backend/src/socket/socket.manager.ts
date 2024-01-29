import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Server, Socket } from 'socket.io';
import { SocketInfoDto } from 'src/socket/dto/socket-info.dto';
import { Logger } from 'winston';

@Injectable()
export class SocketManager {
  private server: Server;
  private readonly sockets: Map<string, SocketInfoDto> = new Map();

  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  setServer(server: Server) {
    this.server = server;
  }

  addSocket(socket: Socket) {
    const socketInfo = new SocketInfoDto();
    socketInfo.socket = socket;
    this.sockets.set(socket.id, socketInfo);
  }

  removeSocket(socket: Socket) {
    this.sockets.delete(socket.id);
  }

  /**
   * Send event to specific room by room identifier
   * @param roomIdentifier Room identifier
   * @param event Event name
   * @param data Data
   * @returns
   */
  notifyByRoomIdentifier(roomIdentifier: string, event: string, data: any) {
    const room = this.server.sockets.adapter.rooms.get(roomIdentifier);

    if (!room) {
      return;
    }

    this.server.to(roomIdentifier).emit(event, data);
  }
}
