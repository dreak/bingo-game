import { Injectable } from '@angular/core';
import { ParticipantReadyStatusDto } from '@models/socket/participant-ready-status.dto';
import { WinningNumberStatusDto } from '@models/socket/winning-number-status.dto';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private readonly socket: Socket) {}

  subscribeNotifications(roomIdentifier: string) {
    this.socket.emit('subscribe-notification', roomIdentifier);
  }

  getParticipantsReadyStatus() {
    return this.socket.fromEvent<ParticipantReadyStatusDto[]>('update-participants-ready-status');
  }

  getOpenedWinningNumbers() {
    return this.socket.fromEvent<WinningNumberStatusDto>('update-opened-winning-numbers');
  }
}
