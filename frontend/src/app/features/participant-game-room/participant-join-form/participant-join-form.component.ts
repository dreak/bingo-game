import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameParticipantResponseDto } from '@models/game-participant/game-participant.response.dto';
import { GameParticipantService } from '@services/game-participant.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'bingo-participant-join-form',
  templateUrl: './participant-join-form.component.html',
  styleUrls: ['./participant-join-form.component.scss']
})
export class ParticipantJoinFormComponent {
  readonly roomIdentifier: string | null;

  validateForm = this.fb.group({
    userName: this.fb.control<string | null>(null, [Validators.required])
  });

  isLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly messageService: NzMessageService,
    private readonly gameParticipantService: GameParticipantService
  ) {
    this.roomIdentifier = this.route.snapshot.paramMap.get('roomIdentifier');
  }

  onJoin() {
    if (this.validateForm.valid) {
      this.isLoading = true;
      this.gameParticipantService
        .joinGameRoom(this.roomIdentifier as string, {
          userName: this.validateForm.value.userName as string
        })
        .subscribe({
          next: (gameParticipantResponseDto) => {
            this.isLoading = false;
            this.navigateToGameBoard(gameParticipantResponseDto);
          },
          error: (error) => {
            this.messageService.error(error);
            this.isLoading = false;
          }
        });
    }
  }

  navigateToGameBoard(gameParticipantResponseDto: GameParticipantResponseDto) {
    this.router.navigate([
      '/game-room',
      this.roomIdentifier,
      'participant',
      gameParticipantResponseDto.userIdentifier,
      'board'
    ]);
  }
}
