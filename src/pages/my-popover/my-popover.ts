import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-my-popover',
  templateUrl: 'my-popover.html',
})
export class MyPopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  gotoProfile(){
    this.navCtrl.push('ProfilePage');
  }

  gotoPosts() {
    this.navCtrl.push('PostsPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPopoverPage');
  }

}
