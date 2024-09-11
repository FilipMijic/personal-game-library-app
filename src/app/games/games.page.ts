import { Component, OnInit } from '@angular/core';
import { Game } from './game.model';
import { GamesService } from './games.service';
import { ModalController } from '@ionic/angular';
import { GameModalComponent } from './game-modal/game-modal.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  games: Game[] = [];

  constructor(private gamesService: GamesService, private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  openModal() {
    this.modalCtrl.create({
      component: GameModalComponent,
      componentProps: { title: 'Add game' }
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if (resultData.role === 'confirm') {
        console.log(resultData);
        this.gamesService.addGame(resultData.data.gameData.title, resultData.data.gameData.developer, resultData.data.gameData.publisher, resultData.data.gameData.genre, resultData.data.gameData.platform, resultData.data.gameData.status, resultData.data.gameData.imageUrl)
        .subscribe((games) => {
        });
      }
    });
  }

}
