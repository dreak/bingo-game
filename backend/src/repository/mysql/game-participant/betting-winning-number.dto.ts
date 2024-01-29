import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class BettingWinningNumberDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  rowNumber: number;
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  columnNumber: number;
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  winningNumber: number;
  @ApiHideProperty()
  @Exclude()
  isHit: boolean = false;
}
