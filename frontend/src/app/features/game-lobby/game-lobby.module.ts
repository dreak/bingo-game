import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { GameLobbyRoutingModule } from './game-lobby-routing.module';
import { GameLobbyComponent } from './game-lobby.component';

const nzModule = [NzFormModule, NzSelectModule, NzButtonModule, NzMessageModule];

@NgModule({
  declarations: [GameLobbyComponent],
  imports: [CommonModule, GameLobbyRoutingModule, FormsModule, ReactiveFormsModule, ...nzModule]
})
export class GameLobbyModule {}
