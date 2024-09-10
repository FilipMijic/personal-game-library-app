import { Component, OnInit } from '@angular/core';
import { Game } from './game.model';
import { GamesService } from './games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
  }

}
