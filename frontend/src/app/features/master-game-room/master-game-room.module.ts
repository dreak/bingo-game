import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ClipboardModule } from 'ngx-clipboard';
import { DashboardModule } from '../dashboard/dashboard.module';
import { InviteModalComponent } from './invite-modal/invite-modal.component';
import { MasterGameRoomRoutingModule } from './master-game-room-routing.module';
import { MasterGameRoomComponent } from './master-game-room.component';

const nzModule = [
  NzFormModule,
  NzInputNumberModule,
  NzButtonModule,
  NzQRCodeModule,
  NzModalModule,
  NzMessageModule,
  NzSpaceModule
];

@NgModule({
  declarations: [MasterGameRoomComponent, InviteModalComponent],
  imports: [
    CommonModule,
    MasterGameRoomRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    DashboardModule,
    ...nzModule
  ]
})
export class MasterGameRoomModule {}
