import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../game.model';

@Component({
  selector: 'app-game-element',
  templateUrl: './game-element.component.html',
  styleUrls: ['./game-element.component.scss'],
})
export class GameElementComponent  implements OnInit {

  @Input() game: Game;

  constructor() { }

  ngOnInit() {}

}
