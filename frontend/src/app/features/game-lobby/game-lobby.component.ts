import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameRoomResponseDto } from '@models/game-room/game-room.response.dto';
import { GameRoomService } from '@services/game-room.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'bingo-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent {
  readonly gameSizeList = [5, 6, 7, 8, 9, 10];

  validateForm = this.fb.group({
    gameSize: this.fb.control<number | null>(null, [Validators.required])
  });

  isLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly gameRoomService: GameRoomService,
    private readonly messageService: NzMessageService
  ) {}

  onCreate() {
    if (this.validateForm.valid) {
      this.isLoading = true;
      this.gameRoomService
        .create({
          gameSize: this.validateForm.value.gameSize as number
        })
        .subscribe({
          next: (gameRoomResponseDto) => {
            console.log(gameRoomResponseDto);
            this.isLoading = false;
            this.navigateToGameRoom(gameRoomResponseDto);
          },
          error: (error) => {
            this.messageService.error(error);
            this.isLoading = false;
          }
        });
    }
  }

  private navigateToGameRoom(gameRoomResponseDto: GameRoomResponseDto) {
    const queryParams = {
      masterCode: gameRoomResponseDto.masterCode,
      gameSize: gameRoomResponseDto.gameSize
    };

    this.router.navigate(['/game-room', gameRoomResponseDto.roomIdentifier, 'master'], {
      queryParams
    });
  }
}
