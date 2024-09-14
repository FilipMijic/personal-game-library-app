import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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

  constructor(private modalCtrl: ModalController, private storage: Storage) { }

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

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    this.imageSource = image.dataUrl;
    const blob = this.dataURLtoBlob(image.dataUrl);
    const url = await this.uploadImage(blob, image);
    console.log(url);
    this.imageUrl = url;
  }

  dataURLtoBlob(dataurl: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  async uploadImage(blob: any, imageData: any) {
    try {
      const currentDate = Date.now();
      const filePath = `test/${currentDate}.${imageData.format}`;
      const fileRef = ref(this.storage, filePath);
      const task = await uploadBytes(fileRef, blob);
      const url = getDownloadURL(fileRef);
      return url;
    } catch (e) {
      throw (e);
    }
  }

}
