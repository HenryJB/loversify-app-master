import { Component } from '@angular/core';
import { NavController, ToastController, IonicPage, Events } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { SharedProvider } from '../../providers/shared/shared';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

// The account fields for the login form.
private form = this.formBuilder.group({
  'first_name': ['', Validators.required],
  'last_name': ['', Validators.required],
  'country': ['', Validators.required],
  'email': ['', Validators.required],
  'password': ['', Validators.required]
});

rootPage:any;
countries: Array<any>;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public _sharedService: SharedProvider,
    public _authService: AuthProvider,
    public events: Events
  ) {}

  ionViewDidLoad() {

    this.getCountries()
  }

  getCountries() {
    this._authService.getContries()
    .subscribe((res) => {
       this.countries = res
    }, err => {
      // caught error
    })
  }

  backToLoagin() {
    this.navCtrl.push('LoginPage')
  }

  signUp() {
    let loader = this._sharedService.loader();
    loader.present().then(() => {
      this._authService.signup(this.form.value)
        .subscribe((resp) => {
          if (resp.success) {
            this.rootPage = HomePage;
            this.navCtrl.setRoot(HomePage);
            this._authService.saveToken('token', resp.data.token);
            this.events.publish('user:currentUser', this._authService.currentUser())
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
}
