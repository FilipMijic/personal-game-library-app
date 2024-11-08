import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Game } from '../game.model';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { GamesService } from '../games.service';
import { GameModalComponent } from '../game-modal/game-modal.component';
import { StatusModalComponent } from '../status-modal/status-modal.component';
import { Router } from '@angular/router';
import { RecommendationsService } from 'src/app/recommendations/recommendations.service';
import { Recommendation } from 'src/app/recommendations/recommendation.model';
import { RecommendationsModalComponent } from 'src/app/recommendations/recommendations-modal/recommendations-modal.component';

@Component({
  selector: 'app-game-element',
  templateUrl: './game-element.component.html',
  styleUrls: ['./game-element.component.scss'],
})
export class GameElementComponent  implements OnInit {

  @Input() game: Game;
  @Input() recommendation: Recommendation;
  @ViewChild('popover') popover;
  constructor(private alertCtrl: AlertController, private gameService: GamesService, private modalCtrl: ModalController, private recommendationService: RecommendationsService, private popoverController: PopoverController, private router: Router) { }

  ngOnInit() {}

  isOpen = false;

  showOptions(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.popover.event = e;
    this.isOpen = true;
  }

  async onEditGame() {
    console.log('On edit game');
    const modal = await this.modalCtrl.create({
      component: GameModalComponent,
      componentProps: {

        title: 'Edit game',
        gameTitle: this.game.title,
        developer: this.game.developer,
        genre: this.game.genre,
        platform: this.game.platform,
        publisher: this.game.publisher,
        status: this.game.status,
        imageUrl: this.game.imageUrl,
        mode: 'edit'
      }

    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log('Data iz edita');
    console.log(data);
    console.log(role);

    if (role === 'confirm') {
      this.gameService
        .editGame(
          this.game.id,
          data.gameData.title,
          data.gameData.developer,
          data.gameData.genre,
          data.gameData.publisher,
          data.gameData.imageUrl,
          data.gameData.platform,
          data.gameData.status,
          this.game.userId,
          this.game.recommendId
        )
        .subscribe((game) => {
          this.game.title = data.gameData.gameTitle;
          this.game.developer = data.gameData.developer;
          this.game.genre = data.gameData.genre;
          this.game.publisher = data.gameData.publisher;
          this.game.platform = data.gameData.platform;
          this.game.status = data.gameData.status;
          this.game.imageUrl = data.gameData.imageUrl;
        });
    }

    this.popoverController.dismiss();
  }

  openAlert() {
    event.stopPropagation();
    event.preventDefault();
    this.isOpen = false;
    this.alertCtrl.create({
      header: 'Deleting game',
      message: 'Are you sure you want to delete this game from your library?',
      buttons: [{
        text: 'Delete',
        handler: () => {
          console.log(this.game.id);
          this.gameService.deleteGame(this.game.id).subscribe(() => {
          });
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          console.log('Do not delete it!');
        }
      }]
    }).then(alert => alert.present());
  }

  async onChangeStatus() {
    const modal = await this.modalCtrl.create({
      component: StatusModalComponent,
      componentProps: {

        title: 'Change status',
        gameTitle: this.game.title,
        developer: this.game.developer,
        genre: this.game.genre,
        platform: this.game.platform,
        publisher: this.game.publisher,
        status: this.game.status,
        imageUrl: this.game.imageUrl,
        mode: 'edit'
      }

    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log(data);

    if (role === 'confirm') {
      this.gameService
        .editGame(
          this.game.id,
          this.game.title,
          this.game.developer,
          this.game.genre,
          this.game.publisher,
          this.game.imageUrl,
          this.game.platform,
          data.gameData.status,
          this.game.userId,
          this.game.recommendId
        )
        .subscribe((game) => {
          console.log(data);
          this.game.title = data.gameData.gameTitle;
          this.game.developer = data.gameData.developer;
          this.game.genre = data.gameData.genre;
          this.game.publisher = data.gameData.publisher;
          this.game.platform = data.gameData.platform;
          this.game.status = data.gameData.status;
          this.game.recommendId = data.gameData.recommendId;
        });
    }

    this.popoverController.dismiss();
    this.router.navigateByUrl('/games');
  }

  openModal(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.modalCtrl.create({
      component: RecommendationsModalComponent,
      componentProps: { title: 'Add recommendation' }
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      console.log('Res data iz add recommendatiuosna');
      console.log(resultData);
      if (resultData.role === 'confirm') {
        console.log(resultData);
        this.recommendationService.addRecommendation(resultData.data.recommendationData.rating, resultData.data.recommendationData.text)
          .subscribe((recommendation) => {
            console.log(recommendation);
            this.gameService.editGame(this.game.id, this.game.title, this.game.developer, this.game.genre, this.game.publisher, this.game.imageUrl, this.game.platform, this.game.status, this.game.userId, recommendation.id).subscribe(games => { });
          });
      }
    });
  }

  async openModalEdit(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    console.log('On edit recommendation');
    const recommendation = await this.recommendationService.getRecommendation(this.game.recommendId).toPromise();
    this.recommendation = recommendation
    console.log(this.recommendation);
    const modal = await this.modalCtrl.create({
      component: RecommendationsModalComponent,
      componentProps: {
        title: 'Edit recommendation',
        rating: +this.recommendation.rating,
        text: this.recommendation.text,
        mode: 'edit'
      }

    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log(data);

    if (role === 'confirm') {
      this.recommendationService
        .editRecommendation(
          this.recommendation.id,
          data.recommendationData.rating,
          data.recommendationData.text
        )
        .subscribe((recommendation) => {
          this.recommendation.rating = data.recommendationData.rating;
          this.recommendation.text = data.recommendationData.title;
        });
    }
  }

}
