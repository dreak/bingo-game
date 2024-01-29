import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'lobby',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./game-lobby/game-lobby.module').then((m) => m.GameLobbyModule)
          }
        ]
      },
      {
        path: 'game-room',
        children: [
          {
            path: ':roomIdentifier/master',
            loadChildren: () =>
              import('./master-game-room/master-game-room.module').then(
                (m) => m.MasterGameRoomModule
              )
          },
          {
            path: ':roomIdentifier/participant',
            loadChildren: () =>
              import('./participant-game-room/participant-game-room.module').then(
                (m) => m.ParticipantGameRoomModule
              )
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/exception/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}
