import { Component, Input, OnInit } from '@angular/core';
import { GameExtended } from '../game-extended.model';

@Component({
  selector: 'app-recommendations-element',
  templateUrl: './recommendations-element.component.html',
  styleUrls: ['./recommendations-element.component.scss'],
})
export class RecommendationsElementComponent  implements OnInit {

  @Input() gameExtended: GameExtended;
  constructor() { }

  ngOnInit() {}

}
