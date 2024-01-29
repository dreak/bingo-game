import { GenericRepository } from '@repository/generic.repository';
import { GameParticipant } from '@repository/mysql/game-participant/game-participant.entity';
import { CustomRepository } from '@repository/typeorm-ex/typeorm-ex.decorator';

@CustomRepository(GameParticipant)
export class GameParticipantRepository extends GenericRepository<GameParticipant> {
  async getByGameRoomIdAndUserName(gameRoomId: number, userName: string) {
    return await this.findOne({
      where: {
        gameRoomId: gameRoomId,
        userName: userName
      }
    });
  }

  async getByUserIdentifier(userIdentifier: string) {
    return await this.findOne({
      where: {
        userIdentifier: userIdentifier
      }
    });
  }

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
}
