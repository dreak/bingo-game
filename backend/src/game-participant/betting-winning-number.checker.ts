import { Inject, Injectable } from '@nestjs/common';
import { BettingWinningNumberDto } from '@repository/mysql/game-participant/betting-winning-number.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class BettingWinningNumberChecker {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  /**
   * Check if there are duplicate winning numbers in the betting winning numbers
   * @param bettingWinningNumbersDto Betting winning numbers DTO
   * @returns True if there are duplicate winning numbers in the betting winning numbers, otherwise false
   */
  isDuplicatesWinningNumber(bettingWinningNumbersDto: BettingWinningNumberDto[]) {
    const numberSet = new Set();

    for (const bettingWinningNumber of bettingWinningNumbersDto) {
      if (numberSet.has(bettingWinningNumber.winningNumber)) {
        return true;
      }

      numberSet.add(bettingWinningNumber.winningNumber);
    }

    return false;
  }

  /**
   * Check if there are duplicate cells in the betting winning numbers
   * @param bettingWinningNumbersDto Betting winning numbers DTO
   * @returns True if there are duplicate cells in the betting winning numbers, otherwise false
   */
  isDuplicatesCell(bettingWinningNumbersDto: BettingWinningNumberDto[]) {
    const cellSet = new Set();

    for (const bettingWinningNumber of bettingWinningNumbersDto) {
      const cell = `${bettingWinningNumber.rowNumber}-${bettingWinningNumber.columnNumber}`;

      if (cellSet.has(cell)) {
        return true;
      }

      cellSet.add(cell);
    }

    return false;
  }
}
