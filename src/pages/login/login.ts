import { Component} from '@angular/core';
import {  NavController, NavParams, IonicPage} from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 
  constructor( public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //gotoLogin(){
   // this.navCtrl.push('LoginPage');
  //}

}
