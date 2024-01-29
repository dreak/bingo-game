import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GameRoomService } from '@services/game-room.service';
import { GameWinningNumberService } from '@services/game-winning-number.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InviteModalComponent } from './invite-modal/invite-modal.component';

@Component({
  selector: 'bingo-master-game-room',
  templateUrl: './master-game-room.component.html',
  styleUrls: ['./master-game-room.component.scss']
})
export class MasterGameRoomComponent {
  readonly roomIdentifier: string;
  masterCode: string;
  gameSize: number;
  maxNumber: number;

  validateForm = this.fb.group({
    winningNumber: this.fb.control<number | null>(null, [Validators.required])
  });

  isLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly modalService: NzModalService,
    private readonly messageService: NzMessageService,
    private readonly gameWinningNumberService: GameWinningNumberService,
    private readonly gameRoomService: GameRoomService
  ) {
    this.roomIdentifier = this.route.snapshot.paramMap.get('roomIdentifier') as string;
    this.route.queryParams.subscribe((params) => {
      this.masterCode = params['masterCode'];
      this.gameSize = parseInt(params['gameSize']);
      this.maxNumber = this.gameRoomService.getMaxNumberByGameSize(this.gameSize);
    });
  }

  onInvite() {
    const modal = this.modalService.create({
      nzTitle: 'Invite Participants',
      nzCentered: true,
      nzWidth: 360,
      nzContent: InviteModalComponent
    });

    const instance = modal.getContentComponent();
    instance.inviteLink = `${window.location.origin}/game-room/${this.roomIdentifier}/participant/join`;
  }

  onOpen() {
    if (this.validateForm.valid) {
      this.isLoading = true;
      this.gameWinningNumberService
        .openWinningNumber(this.roomIdentifier, {
          masterCode: this.masterCode,
          winningNumber: this.validateForm.value.winningNumber as number
        })
        .subscribe({
          next: (gameWinningNumberResponseDto) => {
            this.messageService.success('Winning number has been opened');
            this.isLoading = false;
          },
          error: (error) => {
            this.messageService.error(error);
            this.isLoading = false;
          }
        });
    }
  }
}
