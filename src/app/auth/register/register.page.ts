import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService, private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    this.loadingCtrl.create({ message: 'Registering...' }).then(loadingEl => {
      loadingEl.present();
    this.authService.register(form.value).subscribe((resData) => {
      console.log('Registracija uspesna');
      console.log(resData);
      loadingEl.dismiss();
      this.router.navigateByUrl('/games');
      });
    })
  }

}
