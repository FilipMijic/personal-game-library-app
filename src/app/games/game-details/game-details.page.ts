import { Component, OnInit } from '@angular/core';
import { Game } from '../game.model';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {

  game: Game = <Game>{};
  constructor(private route: ActivatedRoute, private gamesService: GamesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.gamesService.getGame(paramMap.get('gameId')).subscribe((game) => {
        this.game = game;
        console.log(game);
      });
    })
  }

}
