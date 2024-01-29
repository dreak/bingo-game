import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterGameRoomComponent } from './master-game-room.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MasterGameRoomComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterGameRoomRoutingModule {}
