import { BettingWinningNumberDto } from '@models/game-board/betting-winning-number.dto';

export interface BetWinningNumbersRequestDto {
  selectedWinningNumbers: BettingWinningNumberDto[];
}
