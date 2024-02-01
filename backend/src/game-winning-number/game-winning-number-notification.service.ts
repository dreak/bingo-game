import { Inject, Injectable } from '@nestjs/common';
import { GameParticipantRepository } from '@repository/mysql/game-participant/game-participant.repository';
import { GameRoom } from '@repository/mysql/game-room/game-room.entity';
import { GameWinningNumberRepository } from '@repository/mysql/game-winning-number/game-winning-number.repository';
import { SocketEvent } from '@shared/constants/socket-event.enum';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserLinkedLineStatusDto } from 'src/game-winning-number/dto/user-linked-line-status.dto';
import { WinningNumberStatusDto } from 'src/game-winning-number/dto/winning-number-status.dto';
import { WinningNumberCalculator } from 'src/game-winning-number/winning-number.calculator';
import { SocketManager } from 'src/socket/socket.manager';
import { Logger } from 'winston';

@Injectable()
export class GameWinningNumberNotificationService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly socketManager: SocketManager,
    private readonly winningNumberCalculator: WinningNumberCalculator,
    private readonly gameWinningNumberRepo: GameWinningNumberRepository,
    private readonly gameParticipantRepo: GameParticipantRepository
  ) {}

  async notifyWinningNumberOpened(gameRoom: GameRoom) {
    const gameWinningNumbers = await this.gameWinningNumberRepo.getByGameRoomId(
      gameRoom.gameRoomId
    );

    const winningNumberStatus: WinningNumberStatusDto = {
      openedWinningNumbers: gameWinningNumbers.map((x) => x.winningNumber),
      userLinkedLines: await this.getUserLinkedLinesStatus(gameRoom)
    };

    this.socketManager.notifyByRoomIdentifier(
      gameRoom.roomIdentifier,
      SocketEvent.UpdateOpenedWinningNumbers,
      winningNumberStatus
    );
  }

  async getUserLinkedLinesStatus(gameRoom: GameRoom) {
    const participants = await this.gameParticipantRepo.getByGameRoomId(gameRoom.gameRoomId);

    const participantsStatus = participants.map((x) => {
      const userLinkedLinesStatus: UserLinkedLineStatusDto = {
        userName: x.userName,
        linkedLines:
          x.bettingNumber !== null
            ? this.winningNumberCalculator.calcLinkedLines(
                x.bettingNumber,
                'isHit',
                gameRoom.gameSize
              )
            : 0,
        userLinkedLines:
          x.bettingNumber !== null
            ? this.winningNumberCalculator.calcLinkedLines(
                x.bettingNumber,
                'isUserHit',
                gameRoom.gameSize
              )
            : 0
      };
      return userLinkedLinesStatus;
    });

    return participantsStatus;
  }
}
