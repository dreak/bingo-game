import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameWinningNumber } from '@repository/mysql/game-winning-number/game-winning-number.entity';
import { FeatureName } from '@shared/constants/feature-name.enum';
import { OpenWinningNumberDto } from 'src/game-winning-number/dto/open-winning-number.dto';
import { GameWinningNumberService } from 'src/game-winning-number/game-winning-number.service';

@ApiTags(FeatureName.GameWinningNumber)
@Controller()
export class GameWinningNumberController {
  constructor(private readonly gameWinningNumberService: GameWinningNumberService) {}

  @Post('game-rooms/:roomIdentifier/winning-numbers')
  @ApiOperation({ summary: 'Open winning number' })
  @ApiResponse({ status: HttpStatus.CREATED, type: GameWinningNumber })
  async openWinningNumber(
    @Param('roomIdentifier') roomIdentifier: string,
    @Body() openWinningNumberDto: OpenWinningNumberDto
  ) {
    return this.gameWinningNumberService.openWinningNumber(roomIdentifier, openWinningNumberDto);
  }
}
