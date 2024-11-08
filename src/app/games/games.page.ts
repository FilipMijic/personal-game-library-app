import { Component, OnInit } from '@angular/core';
import { Game } from './game.model';
import { GamesService } from './games.service';
import { ModalController } from '@ionic/angular';
import { GameModalComponent } from './game-modal/game-modal.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  games: Game[] = [];
  filteredGames: Game[] = [];
  private gamesSub: Subscription;
  userId: string;

  constructor(private gamesService: GamesService, private modalCtrl: ModalController, private authService: AuthService) {}

  ngOnInit() {
    this.gamesSub = this.gamesService.games.subscribe((games) => {
    this.games = games;
    this.filteredGames = [...this.games];
  });

    this.authService.userId.subscribe(userId => this.userId = userId)

  }

  ionViewWillEnter() {
    this.gamesService.getGames(this.userId).subscribe((games) => {
    this.filteredGames = [...this.games];
    });
  }

  filterGames(event: any) {
    const status = event.detail.value;
    if (status === 'all') {
      this.filteredGames = [...this.games];
    } else {
      this.filteredGames = this.games.filter(game => game.status === status);
    }
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
        this.gamesService.addGame(resultData.data.gameData.title, resultData.data.gameData.developer, resultData.data.gameData.publisher, resultData.data.gameData.genre, resultData.data.gameData.platform, resultData.data.gameData.status, "", resultData.data.gameData.imageUrl)
        .subscribe((games) => {
          this.filteredGames = [...this.games];
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.gamesSub) {
      this.gamesSub.unsubscribe();
    }
  }

}
