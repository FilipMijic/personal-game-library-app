import { Component, OnInit } from '@angular/core';
import { Game } from '../games/game.model';
import { GameExtended } from './game-extended.model';
import { Recommendation } from './recommendation.model';
import { GamesService } from '../games/games.service';
import { AuthService } from '../auth/auth.service';
import { RecommendationsService } from './recommendations.service';
import { Subscription } from 'rxjs';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.page.html',
  styleUrls: ['./recommendations.page.scss'],
})
export class RecommendationsPage implements OnInit {
  games: Game[] = [];
  private gamesSub: Subscription;
  userId: string;
  gameExtended: GameExtended;
  gamesExtended: GameExtended[] = [];
  recommendation: Recommendation;
  constructor(private gamesService: GamesService, private authService: AuthService, private recommendationsService: RecommendationsService) { }

  ngOnInit() {
    this.authService.userId.subscribe(userId => this.userId = userId);
    this.gamesService.getAllGames(this.userId).subscribe((games) => {
      this.games = games;
      for (let game of this.games) {
        this.recommendationsService.getRecommendation(game.recommendId).subscribe(recommendation => {
          this.recommendation = recommendation;
          this.gameExtended = new GameExtended(game.id, game.title, game.developer, game.genre, game.publisher, game.platform, game.status, game.imageUrl, game.userId, game.recommendId, recommendation.rating, recommendation.text);
          console.log(this.gameExtended);
          this.gamesExtended.push(this.gameExtended);
          this.gamesExtended = this.gamesExtended.filter(game => game.userId !== this.userId && game.recommendId !== '');
        });
      }
    });

    this.scheduleNotification();
  }

  async scheduleNotification() {

    let options: ScheduleOptions = {
      notifications: [{
        id: 111,
        title: 'Reminder',
        body: 'Continue playing some of your favourite games!',
        largeBody: 'Jump back to world of gaming and enjoy beautiful stories and gameplay',
        summaryText: 'Your games are waiting for you!',
        schedule: {
          allowWhileIdle: true,
          every: 'minute',
          on: {
            minute: 1
          }
        }
      }
      ]
    }

    try {
      await LocalNotifications.schedule(options);
    } catch (ex) {
      console.log(ex);
    }
  }

}