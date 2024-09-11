import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss'],
})
export class GameModalComponent implements OnInit {
  @ViewChild("f", { static: true }) form: NgForm;
  @Input() title: string;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() gameTitle: string;
  @Input() developer: string;
  @Input() genre: string;
  @Input() publisher: string;
  @Input() platform: string;
  @Input() status: string;
  @Input() imageUrl: string = 'https://static.vecteezy.com/system/resources/thumbnails/000/357/555/small/Electronic_Devices__2812_29.jpg';

  imageSource: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss({
      gameData:
      {
        title: this.form.value['title'],
        developer: this.form.value['developer'],
        genre: this.form.value['genre'],
        publisher: this.form.value['publisher'],
        platform: this.form.value['platform'],
        status: this.form.value['status'],
        imageUrl: this.imageUrl
      }
    }, 'confirm');
  }

}
