import { BettingWinningNumberDto } from '@models/game-board/betting-winning-number.dto';

export interface GameParticipantResponseDto {
  gameParticipantId: number;
  gameRoomId: number;
  userIdentifier: string;
  userName: string;
  bettingNumber: BettingWinningNumberDto[] | null;
  created_date: Date;
  modified_date: Date;
}
