import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class OpenWinningNumberDto {
  @IsNotEmpty()
  @IsString()
  masterCode: string;
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  winningNumber: number;
}
