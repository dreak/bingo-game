import { Module } from '@nestjs/common';
import { SocketGateway } from 'src/socket/socket.gateway';
import { SocketManager } from 'src/socket/socket.manager';

const exportServices = [SocketManager];

@Module({
  imports: [],
  controllers: [],
  providers: [...exportServices, SocketGateway],
  exports: [...exportServices]
})
export class SocketModule {}
