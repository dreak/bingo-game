import { Inject, Injectable } from '@nestjs/common';
import { GameParticipantRepository } from '@repository/mysql/game-participant/game-participant.repository';
import { AlreadyExistsError } from '@shared/exceptions/already-exists.error';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class GameParticipantValidator {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly gameParticipantRepo: GameParticipantRepository
  ) {}

  async validateUniqueKey(gameRoomId: number, userName: string) {
    const existingParticipant = await this.gameParticipantRepo.getByGameRoomIdAndUserName(
      gameRoomId,
      userName
    );

    if (existingParticipant) {
      throw new AlreadyExistsError('User name already exists');
    }
  }
}
