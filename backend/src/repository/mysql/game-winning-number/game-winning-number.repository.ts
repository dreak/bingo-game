import { GenericRepository } from '@repository/generic.repository';
import { GameWinningNumber } from '@repository/mysql/game-winning-number/game-winning-number.entity';
import { CustomRepository } from '@repository/typeorm-ex/typeorm-ex.decorator';

@CustomRepository(GameWinningNumber)
export class GameWinningNumberRepository extends GenericRepository<GameWinningNumber> {
  async getByGameRoomId(gameRoomId: number) {
    return await this.find({
      where: {
        gameRoomId: gameRoomId
      },
      order: {
        created_date: 'ASC'
      }
    });
  }

  async isExistsByGameRoomId(gameRoomId: number) {
    return await this.isExists({
      where: {
        gameRoomId: gameRoomId
      }
    });
  }
}
