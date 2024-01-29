import { BettingWinningNumberDto } from '@models/game-board/betting-winning-number.dto';

export interface GameRoomInfoResponseDto {
  gameSize: number;
  userBettingWinningNumber: BettingWinningNumberDto[] | null;
}
