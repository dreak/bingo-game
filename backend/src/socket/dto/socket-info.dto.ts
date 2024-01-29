import { Socket } from 'socket.io';

export class SocketInfoDto {
  socket: Socket;
  userIdentifier: string;
}
