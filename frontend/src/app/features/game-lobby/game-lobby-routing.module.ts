import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameLobbyComponent } from './game-lobby.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GameLobbyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameLobbyRoutingModule {}
