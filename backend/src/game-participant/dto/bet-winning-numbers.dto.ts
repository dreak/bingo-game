import { BettingWinningNumberDto } from '@repository/mysql/game-participant/betting-winning-number.dto';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class BetWinningNumbersDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BettingWinningNumberDto)
  selectedWinningNumbers: BettingWinningNumberDto[];
}
