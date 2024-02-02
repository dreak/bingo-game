import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import { SocketEvent } from '@shared/constants/socket-event.enum';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Socket } from 'socket.io';
import { GameParticipantNotificationService } from 'src/game-participant/game-participant-notification.service';
import { Logger } from 'winston';

@WebSocketGateway({
  path: '/bingo-socket',
  allowEIO3: true,
  cors: {
    origin: true,
    credentials: true
  }
})
export class GameParticipantGateway {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly gameParticipantNotificationService: GameParticipantNotificationService
  ) {}

  @SubscribeMessage(SocketEvent.SubscribeNotification)
  async subscribeNotification(
    @ConnectedSocket() socket: Socket,
    @MessageBody() roomIdentifier: string
  ) {
    try {
      socket.join(roomIdentifier);
      await this.gameParticipantNotificationService.notifyParticipantsReadyStatusByRoomIdentifier(
        roomIdentifier
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
