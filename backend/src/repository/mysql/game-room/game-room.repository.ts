import { GenericRepository } from '@repository/generic.repository';
import { GameRoom } from '@repository/mysql/game-room/game-room.entity';
import { CustomRepository } from '@repository/typeorm-ex/typeorm-ex.decorator';

@CustomRepository(GameRoom)
export class GameRoomRepository extends GenericRepository<GameRoom> {
  async getByGameRoomIdentifier(roomIdentifier: string) {
    return await this.findOne({
      where: {
        roomIdentifier: roomIdentifier
      }
    });
  }

  async getByGameRoomId(gameRoomId: number) {
    return await this.findOne({
      where: {
        gameRoomId: gameRoomId
      }
    });
  }
}
