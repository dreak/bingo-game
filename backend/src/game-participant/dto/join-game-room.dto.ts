import { IsNotEmpty, IsString } from 'class-validator';

export class JoinGameRoomDto {
  @IsNotEmpty()
  @IsString()
  userName: string;
}
