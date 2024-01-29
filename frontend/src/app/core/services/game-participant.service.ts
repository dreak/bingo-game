import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { BetWinningNumbersRequestDto } from '@models/game-participant/bet-winning-numbers.request.dto';
import { GameParticipantResponseDto } from '@models/game-participant/game-participant.response.dto';
import { GameRoomInfoResponseDto } from '@models/game-participant/game-room-info.response.dto';
import { JoinGameRoomRequestDto } from '@models/game-participant/join-game-room.request.dto';
import { catchError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GameParticipantService {
  constructor(private readonly httpClient: HttpClient, private readonly apiService: ApiService) {}

  joinGameRoom(roomIdentifier: string, joinGameRoomRequestDto: JoinGameRoomRequestDto) {
    return this.httpClient
      .post<GameParticipantResponseDto>(
        `${environment.apiUrl}/game-rooms/${roomIdentifier}/join`,
        joinGameRoomRequestDto
      )
      .pipe(catchError((error) => this.apiService.formatError(error)));
  }

  betWinningNumbers(
    userIdentifier: string,
    betWinningNumbersRequestDto: BetWinningNumbersRequestDto
  ) {
    return this.httpClient
      .put<GameParticipantResponseDto>(
        `${environment.apiUrl}/game-participants/${userIdentifier}/bet-winning-numbers`,
        betWinningNumbersRequestDto
      )
      .pipe(catchError((error) => this.apiService.formatError(error)));
  }

  getGameRoomInfoByUserIdentifier(userIdentifier: string) {
    return this.httpClient
      .get<GameRoomInfoResponseDto>(
        `${environment.apiUrl}/game-participants/${userIdentifier}/info`
      )
      .pipe(catchError((error) => this.apiService.formatError(error)));
  }
}
