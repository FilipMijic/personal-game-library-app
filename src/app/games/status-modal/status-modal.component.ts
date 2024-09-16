import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss'],
})
export class StatusModalComponent implements OnInit {
  @ViewChild("f", { static: true }) form: NgForm;
  @Input() title: string;
  @Input() status: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

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
        status: this.form.value['status']
      }
    }, 'confirm');

  }

}
