import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParticipantReadyStatusDto } from '@models/socket/participant-ready-status.dto';
import { WinningNumberStatusDto } from '@models/socket/winning-number-status.dto';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SocketService } from '@services/socket.service';
import { Observable, map, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'bingo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() roomIdentifier: string;
  @Output() updateParticipantsReadyStatus = new EventEmitter<ParticipantReadyStatusDto[]>();
  @Output() updateOpenedWinningNumbers = new EventEmitter<WinningNumberStatusDto>();

  participantsReadyStatus$: Observable<ParticipantReadyStatusDto[]>;
  winningNumberStatus$: Observable<WinningNumberStatusDto>;

  constructor(private readonly socketService: SocketService) {}

  ngOnInit() {
    this.socketService.subscribeNotifications(this.roomIdentifier);

    this.participantsReadyStatus$ = this.socketService.getParticipantsReadyStatus().pipe(
      untilDestroyed(this),
      tap((participantsReadyStatus) => {
        this.updateParticipantsReadyStatus.emit(participantsReadyStatus);
      })
    );

    this.winningNumberStatus$ = this.socketService.getOpenedWinningNumbers().pipe(
      untilDestroyed(this),
      map((winningNumberStatus) => {
        winningNumberStatus.userLinkedLines.sort((a, b) =>
          a.linkedLines > b.linkedLines ? -1 : 1
        );
        return winningNumberStatus;
      }),
      tap((winningNumberStatus) => {
        this.updateOpenedWinningNumbers.emit(winningNumberStatus);
      })
    );
  }
}
