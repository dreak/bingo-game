import { Module } from '@nestjs/common';
import { GameWinningNumberNotificationService } from 'src/game-winning-number/game-winning-number-notification.service';
import { GameWinningNumberController } from 'src/game-winning-number/game-winning-number.controller';
import { GameWinningNumberService } from 'src/game-winning-number/game-winning-number.service';
import { WinningNumberCalculator } from 'src/game-winning-number/winning-number.calculator';
import { SocketModule } from 'src/socket/socket.module';

const exportServices = [
  GameWinningNumberService,
  WinningNumberCalculator,
  GameWinningNumberNotificationService
];

@Module({
  imports: [SocketModule],
  controllers: [GameWinningNumberController],
  providers: [...exportServices],
  exports: [...exportServices]
})
export class GameWinningNumberModule {}
