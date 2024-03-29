import { Inject, Injectable } from '@nestjs/common';
import { GameParticipant } from '@repository/mysql/game-participant/game-participant.entity';
import { GameParticipantRepository } from '@repository/mysql/game-participant/game-participant.repository';
import { GameRoomRepository } from '@repository/mysql/game-room/game-room.repository';
import { GameWinningNumberRepository } from '@repository/mysql/game-winning-number/game-winning-number.repository';
import { AlreadyExistsError } from '@shared/exceptions/already-exists.error';
import { InvalidParameterError } from '@shared/exceptions/invalid-parameter.error';
import { NotFoundError } from '@shared/exceptions/not-found.error';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { BettingWinningNumberChecker } from 'src/game-participant/betting-winning-number.checker';
import { BetWinningNumbersDto } from 'src/game-participant/dto/bet-winning-numbers.dto';
import { GameRoomInfo } from 'src/game-participant/dto/game-room-info.dto';
import { HitWinningNumberDto } from 'src/game-participant/dto/hit-winning-number.dto';
import { JoinGameRoomDto } from 'src/game-participant/dto/join-game-room.dto';
import { GameParticipantNotificationService } from 'src/game-participant/game-participant-notification.service';
import { GameWinningNumberNotificationService } from 'src/game-winning-number/game-winning-number-notification.service';
import { ulid } from 'ulid';
import { Logger } from 'winston';

@Injectable()
export class GameParticipantService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly gameRoomRepo: GameRoomRepository,
    private readonly gameParticipantRepo: GameParticipantRepository,
    private readonly gameWinningNumberRepo: GameWinningNumberRepository,
    private readonly gameParticipantNotificationService: GameParticipantNotificationService,
    private readonly bettingWinningNumberChecker: BettingWinningNumberChecker,
    private readonly gameWinningNumberNotificationService: GameWinningNumberNotificationService
  ) {}

  /**
   * Join the game room as a participant
   * @param roomIdentifier Room identifier
   * @param joinGameRoomDto Join game room DTO
   * @returns
   */
  async joinGameRoom(roomIdentifier: string, joinGameRoomDto: JoinGameRoomDto) {
    const existingGameRoom = await this.gameRoomRepo.getByGameRoomIdentifier(roomIdentifier);

    if (!existingGameRoom) {
      throw new NotFoundError('Game room not found');
    }

    // Check if user name already exists in the game room
    const existingParticipant = await this.gameParticipantRepo.getByGameRoomIdAndUserName(
      existingGameRoom.gameRoomId,
      joinGameRoomDto.userName
    );

    if (existingParticipant) {
      throw new AlreadyExistsError('User name already exists');
    }

    // Check if game is already started
    const isWinningNumberExists = await this.gameWinningNumberRepo.isExistsByGameRoomId(
      existingGameRoom.gameRoomId
    );

    if (isWinningNumberExists) {
      throw new InvalidParameterError('Game is already started');
    }

    const newParticipant = new GameParticipant();
    newParticipant.gameRoomId = existingGameRoom.gameRoomId;
    newParticipant.userIdentifier = ulid();
    newParticipant.userName = joinGameRoomDto.userName;
    await this.gameParticipantRepo.save(newParticipant);

    this.logger.info(`User ${newParticipant.userName} joined the game room ${roomIdentifier}`);

    await this.gameParticipantNotificationService.notifyParticipantsReadyStatusByGameRoom(
      existingGameRoom
    );

    return newParticipant;
  }

  /**
   * Bet winning numbers
   * @param betWinningNumbersDto Bet winning numbers DTO
   */
  async betWinningNumbers(userIdentifier: string, betWinningNumbersDto: BetWinningNumbersDto) {
    const existingParticipant = await this.gameParticipantRepo.getByUserIdentifier(userIdentifier);

    if (!existingParticipant) {
      throw new NotFoundError('Participant not found');
    }

    const existingGameRoom = await this.gameRoomRepo.getByGameRoomId(
      existingParticipant.gameRoomId
    );

    if (!existingGameRoom) {
      throw new NotFoundError('Game room not found');
    }

    if (existingParticipant.bettingNumber !== null) {
      throw new InvalidParameterError('Already bet winning numbers');
    }

    const isWinningNumberExists = await this.gameWinningNumberRepo.isExistsByGameRoomId(
      existingParticipant.gameRoomId
    );

    if (isWinningNumberExists) {
      throw new InvalidParameterError('Game is already started');
    }

    if (
      this.bettingWinningNumberChecker.isDuplicatesWinningNumber(
        betWinningNumbersDto.selectedWinningNumbers
      )
    ) {
      throw new InvalidParameterError('Duplicate winning number');
    }

    if (
      this.bettingWinningNumberChecker.isDuplicatesCell(betWinningNumbersDto.selectedWinningNumbers)
    ) {
      throw new InvalidParameterError('Duplicate cell');
    }

    existingParticipant.bettingNumber = betWinningNumbersDto.selectedWinningNumbers;
    await this.gameParticipantRepo.save(existingParticipant);

    this.logger.info(`User ${existingParticipant.userName} bet winning numbers`);

    await this.gameParticipantNotificationService.notifyParticipantsReadyStatusByGameRoom(
      existingGameRoom
    );

    return existingParticipant;
  }

  async hitWinningNumber(userIdentifier: string, hitWinningNumberDto: HitWinningNumberDto) {
    const existingParticipant = await this.gameParticipantRepo.getByUserIdentifier(userIdentifier);

    if (!existingParticipant) {
      throw new NotFoundError('Participant not found');
    }

    const existingGameRoom = await this.gameRoomRepo.getByGameRoomId(
      existingParticipant.gameRoomId
    );

    if (!existingGameRoom) {
      throw new NotFoundError('Game room not found');
    }

    if (existingParticipant.bettingNumber === null) {
      throw new InvalidParameterError('Bet winning numbers not found');
    }

    const betWinningNumber = existingParticipant.bettingNumber.find(
      (x) =>
        x.rowNumber === hitWinningNumberDto.rowNumber &&
        x.columnNumber === hitWinningNumberDto.columnNumber
    );

    if (!betWinningNumber) {
      throw new NotFoundError('Bet winning numbers not found');
    }

    betWinningNumber.isUserHit = !betWinningNumber.isUserHit;

    await this.gameParticipantRepo.save(existingParticipant);

    await this.gameWinningNumberNotificationService.notifyWinningNumberOpened(existingGameRoom);

    return existingParticipant;
  }

  async getGameRoomInfoByUserIdentifier(userIdentifier: string) {
    const existingParticipant = await this.gameParticipantRepo.getByUserIdentifier(userIdentifier);

    if (!existingParticipant) {
      throw new NotFoundError('Participant not found');
    }

    const existingGameRoom = await this.gameRoomRepo.getByGameRoomId(
      existingParticipant.gameRoomId
    );

    if (!existingGameRoom) {
      throw new NotFoundError('Game room not found');
    }

    const gameRoomInfo = new GameRoomInfo();
    gameRoomInfo.gameSize = existingGameRoom.gameSize;
    gameRoomInfo.userBettingWinningNumber = existingParticipant.bettingNumber;

    return gameRoomInfo;
  }
}
