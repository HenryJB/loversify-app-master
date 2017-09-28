import { Component } from '@angular/core';
import { NavController, ToastController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { SharedProvider } from '../../providers/shared/shared';
import { HomePage } from '../home/home';

@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  private form = this.formBuilder.group({
    'email': ['', Validators.required],
    'password': ['', Validators.required]
  });

  rootPage:any;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public _sharedService: SharedProvider,
    public _authService: AuthProvider
  ) {
  }

  // Attempt to login in through our User service
  doLogin() {
    let loader = this._sharedService.loader();
    loader.present().then(() => {
      this._authService.login(this.form.value)
        .subscribe((resp) => {
          if (resp.success) {
            this.rootPage = HomePage;
            this.navCtrl.setRoot(HomePage);
            this._authService.saveToken('token', resp.data.token);
            loader.dismiss();
          } else {
            loader.dismiss();
            this._sharedService.toaster('Wrong email and password');
          }
        }, (err) => {
          // Unable to log in
          loader.dismiss();
          this._sharedService.toaster('internal server error');
      });
    })
  }
  

  gotoSignup(){
    this.navCtrl.push('SignupPage');
  }


}
