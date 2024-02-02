import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class HitWinningNumberDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  rowNumber: number;
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  columnNumber: number;
}
