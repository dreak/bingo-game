import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantGameBoardComponent } from './participant-game-board/participant-game-board.component';
import { ParticipantJoinFormComponent } from './participant-join-form/participant-join-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'join',
        component: ParticipantJoinFormComponent
      },
      {
        path: ':userIdentifier/board',
        component: ParticipantGameBoardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantGameRoomRoutingModule {}
