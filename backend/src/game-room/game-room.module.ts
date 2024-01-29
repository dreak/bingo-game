import { Module } from '@nestjs/common';
import { GameRoomController } from 'src/game-room/game-room.controller';
import { GameRoomService } from 'src/game-room/game-room.service';

const exportServices = [GameRoomService];

@Module({
  imports: [],
  controllers: [GameRoomController],
  providers: [...exportServices],
  exports: [...exportServices]
})
export class GameRoomModule {}
