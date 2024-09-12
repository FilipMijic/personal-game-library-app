import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading: boolean = false;

  constructor(private authService: AuthService, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.isLoading = true;
    this.authService.login(form.value).subscribe((resData) => {
      console.log('Prijava uspesna');
      console.log(resData);
      this.isLoading = false;
      this.router.navigateByUrl('/games');
    }, 
    errRes => {
      console.log(errRes);
      this.isLoading = false;
      let message = 'Error occurred, try again';
      const errCode = errRes.error.error.message;

      if (errCode === 'INVALID_LOGIN_CREDENTIALS') {
        message = 'Incorrect email or password';
      }

      this.alertCtrl.create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Ok']
      }).then((alert) => {
        alert.present();
      })

    });
}

}
