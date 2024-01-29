import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { GameWinningNumberResponseDto } from '@models/game-winning-number/game-winning-number.response.dto';
import { OpenWinningNumberRequestDto } from '@models/game-winning-number/open-winning-number.request.dto';
import { catchError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GameWinningNumberService {
  constructor(private readonly httpClient: HttpClient, private readonly apiService: ApiService) {}

  openWinningNumber(
    roomIdentifier: string,
    openWinningNumberRequestDto: OpenWinningNumberRequestDto
  ) {
    return this.httpClient
      .post<GameWinningNumberResponseDto>(
        `${environment.apiUrl}/game-rooms/${roomIdentifier}/winning-numbers`,
        openWinningNumberRequestDto
      )
      .pipe(catchError((error) => this.apiService.formatError(error)));
  }
}
