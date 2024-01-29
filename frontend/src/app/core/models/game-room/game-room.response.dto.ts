export interface GameRoomResponseDto {
  gameRoomId: number;
  roomIdentifier: string;
  masterCode: string;
  gameSize: number;
  created_date: Date;
  modified_date: Date;
}
