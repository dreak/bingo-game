import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateGameRoomDto {
  @IsNotEmpty()
  @IsInt()
  @Min(5)
  @Max(10)
  gameSize: number;
}
