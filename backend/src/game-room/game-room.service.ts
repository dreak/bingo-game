import { Inject, Injectable } from '@nestjs/common';
import { GameRoom } from '@repository/mysql/game-room/game-room.entity';
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
    const newGameRoom = new GameRoom();
    newGameRoom.roomIdentifier = ulid();
    newGameRoom.masterCode = ulid();
    newGameRoom.gameSize = createGameRoomDto.gameSize;
    await this.gameRoomRepo.save(newGameRoom);

    this.logger.info(`Created new game room, roomIdentifier: ${newGameRoom.roomIdentifier}`);

    return newGameRoom;
  }
}
