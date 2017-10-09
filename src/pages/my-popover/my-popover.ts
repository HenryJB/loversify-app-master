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


  goto(page:string){
    this.navCtrl.push(page);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPopoverPage');
  }

}
