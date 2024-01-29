import { Module } from '@nestjs/common';
import { BettingWinningNumberChecker } from 'src/game-participant/betting-winning-number.checker';
import { GameParticipantNotificationService } from 'src/game-participant/game-participant-notification.service';
import { GameParticipantController } from 'src/game-participant/game-participant.controller';
import { GameParticipantGateway } from 'src/game-participant/game-participant.gateway';
import { GameParticipantService } from 'src/game-participant/game-participant.service';
import { GameWinningNumberModule } from 'src/game-winning-number/game-winning-number.module';
import { SocketModule } from 'src/socket/socket.module';

const exportServices = [
  GameParticipantService,
  GameParticipantNotificationService,
  BettingWinningNumberChecker
];

@Module({
  imports: [SocketModule, GameWinningNumberModule],
  controllers: [GameParticipantController],
  providers: [...exportServices, GameParticipantGateway],
  exports: [...exportServices]
})
export class GameParticipantModule {}
