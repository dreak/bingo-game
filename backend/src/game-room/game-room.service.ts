import { Inject, Injectable } from '@nestjs/common';
import { GameRoomRepository } from '@repository/mysql/game-room/game-room.repository';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateGameRoomDto } from 'src/game-room/dto/create-game-room.dto';
import { ulid } from 'ulid';
import { Logger } from 'winston';

@Injectable()
export class GameRoomService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly gameRoomRepo: GameRoomRepository
  ) {}

  async create(createGameRoomDto: CreateGameRoomDto) {
    const newGameRoom = this.gameRoomRepo.create({
      roomIdentifier: ulid(),
      masterCode: ulid(),
      gameSize: createGameRoomDto.gameSize
    });

    await this.gameRoomRepo.save(newGameRoom);

    this.logger.info(`New game room created: ${newGameRoom.roomIdentifier}`);

    return newGameRoom;
  }
}
