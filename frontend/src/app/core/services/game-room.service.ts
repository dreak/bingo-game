import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { CreateGameRoomRequestDto } from '@models/game-room/create-game-room.request.dto';
import { GameRoomResponseDto } from '@models/game-room/game-room.response.dto';
import Decimal from 'decimal.js';
import { catchError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GameRoomService {
  constructor(private readonly httpClient: HttpClient, private readonly apiService: ApiService) {}

  create(createGameRoomRequestDto: CreateGameRoomRequestDto) {
    return this.httpClient
      .post<GameRoomResponseDto>(`${environment.apiUrl}/game-rooms`, createGameRoomRequestDto)
      .pipe(catchError((error) => this.apiService.formatError(error)));
  }

  getMaxNumberByGameSize(gameSize: number) {
    return new Decimal(gameSize).times(gameSize).toNumber();
  }
}
