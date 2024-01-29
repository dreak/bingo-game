import { BettingWinningNumberDto } from '@repository/mysql/game-participant/betting-winning-number.dto';

export class GameRoomInfo {
  gameSize: number;
  userBettingWinningNumber: BettingWinningNumberDto[] | null;
}
