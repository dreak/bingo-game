import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class JoinGameRoomDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  userName: string;
}
