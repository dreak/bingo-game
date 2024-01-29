import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ParticipantGameBoardComponent } from './participant-game-board/participant-game-board.component';
import { ParticipantGameRoomRoutingModule } from './participant-game-room-routing.module';
import { ParticipantJoinFormComponent } from './participant-join-form/participant-join-form.component';

const nzModule = [
  NzFormModule,
  NzButtonModule,
  NzMessageModule,
  NzInputModule,
  NzModalModule,
  NzSpinModule,
  NzSpaceModule
];

@NgModule({
  declarations: [ParticipantGameBoardComponent, ParticipantJoinFormComponent],
  imports: [
    CommonModule,
    ParticipantGameRoomRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    ...nzModule
  ]
})
export class ParticipantGameRoomModule {}
