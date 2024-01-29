import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameRoom } from '@repository/mysql/game-room/game-room.entity';
import { FeatureName } from '@shared/constants/feature-name.enum';
import { CreateGameRoomDto } from 'src/game-room/dto/create-game-room.dto';
import { GameRoomService } from 'src/game-room/game-room.service';

@ApiTags(FeatureName.GameRoom)
@Controller()
export class GameRoomController {
  constructor(private readonly gameRoomService: GameRoomService) {}

  @Post('game-rooms')
  @ApiOperation({ summary: 'Create game room' })
  @ApiResponse({ status: HttpStatus.CREATED, type: GameRoom })
  async create(@Body() createGameRoomDto: CreateGameRoomDto) {
    return this.gameRoomService.create(createGameRoomDto);
  }
}
