import { UserLinkedLineStatusDto } from 'src/game-winning-number/dto/user-linked-line-status.dto';

export class WinningNumberStatusDto {
  openedWinningNumbers: number[];
  userLinkedLines: UserLinkedLineStatusDto[];
}
