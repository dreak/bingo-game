import { Inject, Injectable } from '@nestjs/common';
import { GameParticipantRepository } from '@repository/mysql/game-participant/game-participant.repository';
import { GameRoom } from '@repository/mysql/game-room/game-room.entity';
import { GameRoomRepository } from '@repository/mysql/game-room/game-room.repository';
import { GameWinningNumber } from '@repository/mysql/game-winning-number/game-winning-number.entity';
import { GameWinningNumberRepository } from '@repository/mysql/game-winning-number/game-winning-number.repository';
import { AlreadyExistsError } from '@shared/exceptions/already-exists.error';
import { InvalidParameterError } from '@shared/exceptions/invalid-parameter.error';
import { NotFoundError } from '@shared/exceptions/not-found.error';
import Decimal from 'decimal.js';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { OpenWinningNumberDto } from 'src/game-winning-number/dto/open-winning-number.dto';
import { GameWinningNumberNotificationService } from 'src/game-winning-number/game-winning-number-notification.service';
import { Transactional } from 'typeorm-transactional';
import { Logger } from 'winston';

@Injectable()
export class GameWinningNumberService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly gameRoomRepo: GameRoomRepository,
    private readonly gameWinningNumberRepo: GameWinningNumberRepository,
    private readonly gameParticipantRepo: GameParticipantRepository,
    private readonly gameWinningNumberNotificationService: GameWinningNumberNotificationService
  ) {}

  /**
   * Open a winning number
   * @param roomIdentifier Room identifier
   * @param openWinningNumberDto Open winning number DTO
   * @returns Game winning number entity
   */
  @Transactional()
  async openWinningNumber(roomIdentifier: string, openWinningNumberDto: OpenWinningNumberDto) {
    const gameRoom = await this.gameRoomRepo.getByGameRoomIdentifier(roomIdentifier);

    if (!gameRoom) {
      throw new NotFoundError('Game room not found');
    }

    // Check if master code is matched
    if (gameRoom.masterCode !== openWinningNumberDto.masterCode) {
      throw new InvalidParameterError('Master code is invalid');
    }

    // Check if winning number already exists
    const gameWinningNumbers = await this.gameWinningNumberRepo.getByGameRoomId(
      gameRoom.gameRoomId
    );

    if (gameWinningNumbers.find((x) => x.winningNumber === openWinningNumberDto.winningNumber)) {
      throw new AlreadyExistsError('Winning number already exists');
    }

    // Calculate max number(game size * game size)
    const maxNumber = new Decimal(gameRoom.gameSize).times(gameRoom.gameSize).toNumber();

    if (gameWinningNumbers.length >= maxNumber) {
      throw new InvalidParameterError('All winning numbers have been opened');
    }

    if (openWinningNumberDto.winningNumber > maxNumber) {
      throw new InvalidParameterError('Winning number is too large');
    }

    const newWinningNumber = new GameWinningNumber();
    newWinningNumber.gameRoomId = gameRoom.gameRoomId;
    newWinningNumber.winningNumber = openWinningNumberDto.winningNumber;
    await this.gameWinningNumberRepo.save(newWinningNumber);

    await this.updateParticipantBettingWinningNumber(gameRoom, newWinningNumber.winningNumber);

    await this.gameWinningNumberNotificationService.notifyWinningNumberOpened(gameRoom);

    return newWinningNumber;
  }

  /**
   * Update participant betting winning number, if the number is hit, set isHit to true
   * @param gameRoom Game room
   * @param winningNumber Winning number
   */
  async updateParticipantBettingWinningNumber(gameRoom: GameRoom, winningNumber: number) {
    const participants = await this.gameParticipantRepo.getByGameRoomId(gameRoom.gameRoomId);

    for (const participant of participants) {
      if (participant.bettingNumber === null) {
        continue;
      }

      const hitWinningNumber = participant.bettingNumber.find(
        (x) => x.winningNumber === winningNumber
      );

      if (hitWinningNumber) {
        hitWinningNumber.isHit = true;

        continue;
      }
    }

    await this.gameParticipantRepo.save(participants);
  }
}
