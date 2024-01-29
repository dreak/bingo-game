import { Body, Controller, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameParticipant } from '@repository/mysql/game-participant/game-participant.entity';
import { FeatureName } from '@shared/constants/feature-name.enum';
import { BetWinningNumbersDto } from 'src/game-participant/dto/bet-winning-numbers.dto';
import { GameRoomInfo } from 'src/game-participant/dto/game-room-info.dto';
import { JoinGameRoomDto } from 'src/game-participant/dto/join-game-room.dto';
import { GameParticipantService } from 'src/game-participant/game-participant.service';

@ApiTags(FeatureName.GameParticipant)
@Controller()
export class GameParticipantController {
  constructor(private readonly gameParticipantService: GameParticipantService) {}

  @Post('game-rooms/:roomIdentifier/join')
  @ApiOperation({ summary: 'Join the game room as a participant' })
  @ApiResponse({ status: HttpStatus.CREATED, type: GameParticipant })
  async joinGameRoom(
    @Param('roomIdentifier') roomIdentifier: string,
    @Body() joinGameRoomDto: JoinGameRoomDto
  ) {
    return this.gameParticipantService.joinGameRoom(roomIdentifier, joinGameRoomDto);
  }

  @Put('game-participants/:userIdentifier/bet-winning-numbers')
  @ApiOperation({ summary: 'Bet winning numbers' })
  @ApiResponse({ status: HttpStatus.OK, type: GameParticipant })
  async betWinningNumbers(
    @Param('userIdentifier') userIdentifier: string,
    @Body() betWinningNumbers: BetWinningNumbersDto
  ) {
    return this.gameParticipantService.betWinningNumbers(userIdentifier, betWinningNumbers);
  }

  @Get('game-participants/:userIdentifier/info')
  @ApiOperation({ summary: 'Retrieve game room info by user identifier' })
  @ApiResponse({ status: HttpStatus.OK, type: GameRoomInfo })
  async getGameRoomInfoByUserIdentifier(@Param('userIdentifier') userIdentifier: string) {
    return this.gameParticipantService.getGameRoomInfoByUserIdentifier(userIdentifier);
  }
}
