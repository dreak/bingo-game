import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BettingWinningNumberDto } from '@models/game-board/betting-winning-number.dto';
import { WinningNumberStatusDto } from '@models/socket/winning-number-status.dto';
import { GameParticipantService } from '@services/game-participant.service';
import { GameRoomService } from '@services/game-room.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'bingo-participant-game-board',
  templateUrl: './participant-game-board.component.html',
  styleUrls: ['./participant-game-board.component.scss']
})
export class ParticipantGameBoardComponent {
  roomIdentifier: string;
  userIdentifier: string;
  gameSize = 0;
  rows: number[];
  selectedWinningNumbers: BettingWinningNumberDto[] = [];
  currentNumber = 1;
  isLoading = false;
  isWinningNumberSubmitted = false;
  openedWinningNumbers: number[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly modalService: NzModalService,
    private readonly messageService: NzMessageService,
    private readonly gameParticipantService: GameParticipantService,
    private readonly gameRoomService: GameRoomService
  ) {
    this.roomIdentifier = this.route.snapshot.paramMap.get('roomIdentifier') as string;
    this.userIdentifier = this.route.snapshot.paramMap.get('userIdentifier') as string;

    this.isLoading = true;

    this.gameParticipantService.getGameRoomInfoByUserIdentifier(this.userIdentifier).subscribe({
      next: (gameRoomResponseDto) => {
        this.gameSize = gameRoomResponseDto.gameSize;
        this.rows = Array(this.gameSize)
          .fill(0)
          .map((x, i) => i + 1);
        for (let i = 1; i <= this.gameSize; i++) {
          for (let j = 1; j <= this.gameSize; j++) {
            this.selectedWinningNumbers.push({
              rowNumber: i,
              columnNumber: j
            });
          }
        }

        if (gameRoomResponseDto.userBettingWinningNumber) {
          this.selectedWinningNumbers = gameRoomResponseDto.userBettingWinningNumber;
          this.currentNumber = this.gameRoomService.getMaxNumberByGameSize(this.gameSize) + 1;
          this.isWinningNumberSubmitted = true;
        }

        this.isLoading = false;
      },
      error: (error) => {
        this.messageService.error(error);
        this.isLoading = false;
      }
    });
  }

  onCellClick(row: number, col: number) {
    const selectedWinningNumber = this.selectedWinningNumbers.find(
      (x) => x.rowNumber === row && x.columnNumber === col
    );

    if (!selectedWinningNumber) {
      return;
    }

    if (
      selectedWinningNumber.winningNumber !== undefined &&
      selectedWinningNumber.winningNumber === this.currentNumber - 1
    ) {
      selectedWinningNumber.winningNumber = undefined;
      this.currentNumber--;
    } else if (selectedWinningNumber.winningNumber === undefined) {
      selectedWinningNumber.winningNumber = this.currentNumber;
      this.currentNumber++;
    }
  }

  getCellValue(row: number, col: number) {
    const selectedWinningNumber = this.selectedWinningNumbers.find(
      (x) => x.rowNumber === row && x.columnNumber === col
    );

    if (!selectedWinningNumber) {
      return undefined;
    }

    return selectedWinningNumber.winningNumber;
  }

  isTableValid() {
    return this.currentNumber > this.gameRoomService.getMaxNumberByGameSize(this.gameSize);
  }

  isHit(row: number, col: number) {
    const selectedWinningNumber = this.selectedWinningNumbers.find(
      (x) => x.rowNumber === row && x.columnNumber === col
    );

    if (!selectedWinningNumber || !selectedWinningNumber.winningNumber) {
      return false;
    }

    return this.openedWinningNumbers.includes(selectedWinningNumber.winningNumber);
  }

  onSubmit() {
    this.modalService.confirm({
      nzTitle: 'Do you Want to submit your board?',
      nzContent: `Board can't be changed after submitted, do you make sure to submit?`,
      nzOnOk: () => {
        if (this.isTableValid()) {
          this.isLoading = true;
          this.gameParticipantService
            .betWinningNumbers(this.userIdentifier as string, {
              selectedWinningNumbers: this.selectedWinningNumbers
            })
            .subscribe({
              next: (gameParticipantResponseDto) => {
                this.messageService.success('Game board has been submitted');
                this.isLoading = false;
                this.isWinningNumberSubmitted = true;
              },
              error: (error) => {
                this.messageService.error(error);
                this.isLoading = false;
              }
            });
        }
      }
    });
  }

  onOpenWinningNumber(winningNumberStatusDto: WinningNumberStatusDto) {
    this.openedWinningNumbers = winningNumberStatusDto.openedWinningNumbers;
  }

  onRandom() {
    let randomNumber: number;

    for (const selectedWinningNumber of this.selectedWinningNumbers) {
      selectedWinningNumber.winningNumber = undefined;
    }

    for (const selectedWinningNumber of this.selectedWinningNumbers) {
      do {
        randomNumber =
          Math.floor(Math.random() * this.gameRoomService.getMaxNumberByGameSize(this.gameSize)) +
          1;
      } while (this.selectedWinningNumbers.find((x) => x.winningNumber === randomNumber));
      selectedWinningNumber.winningNumber = randomNumber;
    }

    this.currentNumber = this.gameRoomService.getMaxNumberByGameSize(this.gameSize) + 1;
  }
}
