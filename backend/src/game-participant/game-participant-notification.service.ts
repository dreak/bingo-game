import { Inject, Injectable } from '@nestjs/common';
import { GameParticipantRepository } from '@repository/mysql/game-participant/game-participant.repository';
import { GameRoom } from '@repository/mysql/game-room/game-room.entity';
import { GameRoomRepository } from '@repository/mysql/game-room/game-room.repository';
import { SocketEvent } from '@shared/constants/socket-event.enum';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ParticipantReadyStatusDto } from 'src/game-participant/dto/participant-ready-status.dto';
import { SocketManager } from 'src/socket/socket.manager';
import { Logger } from 'winston';

@Injectable()
export class GameParticipantNotificationService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly socketManager: SocketManager,
    private readonly gameParticipantRepo: GameParticipantRepository,
    private readonly gameRoomRepo: GameRoomRepository
  ) {}

  /**
   * Notify participants ready status to all room members by room identifier
   * @param roomIdentifier Room identifier
   */
  async notifyParticipantsReadyStatusByRoomIdentifier(roomIdentifier: string) {
    const gameRoom = await this.gameRoomRepo.getByGameRoomIdentifier(roomIdentifier);

    if (!gameRoom) {
      throw new Error('Game room not found');
    }

    await this.notifyParticipantsReadyStatusByGameRoom(gameRoom);
  }

  /**
   * Notify participants ready status to all room members by game room
   * @param gameRoom Game room
   */
  async notifyParticipantsReadyStatusByGameRoom(gameRoom: GameRoom) {
    const participants = await this.gameParticipantRepo.getByGameRoomId(gameRoom.gameRoomId);

    const participantsReadyStatus = participants.map((x) => {
      const participantReadyStatusDto: ParticipantReadyStatusDto = {
        userName: x.userName,
        isReady: x.bettingNumber !== null
      };
      return participantReadyStatusDto;
    });

    this.socketManager.notifyByRoomIdentifier(
      gameRoom.roomIdentifier,
      SocketEvent.UpdateParticipantsReadyStatus,
      participantsReadyStatus
    );
  }
}
