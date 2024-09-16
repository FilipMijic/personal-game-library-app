import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamesPageRoutingModule } from './games-routing.module';

import { GamesPage } from './games.page';
import { GameElementComponent } from './game-element/game-element.component';
import { GameModalComponent } from './game-modal/game-modal.component';
import { StatusModalComponent } from './status-modal/status-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamesPageRoutingModule
  ],
  declarations: [
    GamesPage,
    GameElementComponent,
    GameModalComponent,
    StatusModalComponent
  ]
})
export class GamesPageModule {}
