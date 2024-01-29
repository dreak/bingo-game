import { Global, Module } from '@nestjs/common';
import { GameParticipantRepository } from '@repository/mysql/game-participant/game-participant.repository';
import { GameRoomRepository } from '@repository/mysql/game-room/game-room.repository';
import { GameWinningNumberRepository } from '@repository/mysql/game-winning-number/game-winning-number.repository';
import { TypeOrmExModule } from '@repository/typeorm-ex/typeorm-ex.module';

@Global()
@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      GameParticipantRepository,
      GameRoomRepository,
      GameWinningNumberRepository
    ])
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmExModule]
})
export class RepositoryModule {}
