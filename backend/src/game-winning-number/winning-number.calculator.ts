import { Inject, Injectable } from '@nestjs/common';
import { BettingWinningNumberDto } from '@repository/mysql/game-participant/betting-winning-number.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class WinningNumberCalculator {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  /**
   * Check if there are any linked lines
   * @param bettingWinningNumbersDto Betting winning numbers DTO
   * @param gameSize Game size
   * @returns Linked lines
   */
  calcLinkedLines(
    bettingWinningNumbersDto: BettingWinningNumberDto[],
    hitColumnName: string,
    gameSize: number
  ) {
    let linkedLines = 0;

    linkedLines += this.calcHorizontalLinkedLines(
      bettingWinningNumbersDto,
      hitColumnName,
      gameSize
    );
    linkedLines += this.calcVerticalLinkedLines(bettingWinningNumbersDto, hitColumnName, gameSize);
    linkedLines += this.calcDiagonalLinkedLines(bettingWinningNumbersDto, hitColumnName, gameSize);

    return linkedLines;
  }

  /**
   * Check if there are any horizontal linked lines
   * @param bettingWinningNumbersDto Betting winning numbers DTO
   * @param gameSize Game size
   * @returns Linked lines
   */
  calcHorizontalLinkedLines(
    bettingWinningNumbersDto: BettingWinningNumberDto[],
    hitColumnName: string,
    gameSize: number
  ) {
    let linkedLines = 0;

    for (let row = 1; row <= gameSize; row++) {
      // Reset count for each row
      let count = 0;
      for (let col = 1; col <= gameSize; col++) {
        // Find cell by current row and column
        const selectedWinningNumber = bettingWinningNumbersDto.find(
          (x) => x.rowNumber === row && x.columnNumber === col
        );

        // If the cell is not found or not hit, then this row will not have a linked line, so break to the next row
        if (!selectedWinningNumber || !selectedWinningNumber[hitColumnName]) {
          break;
        }

        count++;

        // If there is a linked line, it should be equal to the game size
        if (count === gameSize) {
          linkedLines++;
        }
      }
    }

    return linkedLines;
  }

  /**
   * Check if there are any vertical linked lines
   * @param bettingWinningNumbersDto Betting winning numbers DTO
   * @param gameSize Game size
   * @returns Linked lines
   */
  calcVerticalLinkedLines(
    bettingWinningNumbersDto: BettingWinningNumberDto[],
    hitColumnName: string,
    gameSize: number
  ) {
    let linkedLines = 0;

    for (let col = 1; col <= gameSize; col++) {
      // Reset count for each column
      let count = 0;
      for (let row = 1; row <= gameSize; row++) {
        // Find cell by current row and column
        const selectedWinningNumber = bettingWinningNumbersDto.find(
          (x) => x.rowNumber === row && x.columnNumber === col
        );

        // If the cell is not found or not hit, then this column will not have a linked line, so break to the next column
        if (!selectedWinningNumber || !selectedWinningNumber[hitColumnName]) {
          break;
        }

        count++;

        // If there is a linked line, it should be equal to the game size
        if (count === gameSize) {
          linkedLines++;
        }
      }
    }

    return linkedLines;
  }

  /**
   * Check if there are any diagonal linked lines
   * @param bettingWinningNumbersDto Betting winning numbers DTO
   * @param gameSize Game size
   * @returns Linked lines
   */
  calcDiagonalLinkedLines(
    bettingWinningNumbersDto: BettingWinningNumberDto[],
    hitColumnName: string,
    gameSize: number
  ) {
    let leftDiagonalCount = 0;
    let rightDiagonalCount = 0;

    for (let i = 1; i <= gameSize; i++) {
      const leftSelectedWinningNumber = bettingWinningNumbersDto.find(
        (x) => x.rowNumber === i && x.columnNumber === i
      );

      if (leftSelectedWinningNumber && leftSelectedWinningNumber[hitColumnName]) {
        leftDiagonalCount++;
      }

      const rightSelectedWinningNumber = bettingWinningNumbersDto.find(
        (x) => x.rowNumber === i && x.columnNumber === gameSize - i + 1
      );

      if (rightSelectedWinningNumber && rightSelectedWinningNumber.isHit) {
        rightDiagonalCount++;
      }
    }

    let linkedLines = 0;

    // If there is a linked line, it should be equal to the game size
    if (leftDiagonalCount === gameSize) {
      linkedLines++;
    }

    // If there is a linked line, it should be equal to the game size
    if (rightDiagonalCount === gameSize) {
      linkedLines++;
    }

    return linkedLines;
  }
}
