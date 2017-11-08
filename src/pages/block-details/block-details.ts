import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BlockDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-block-details',
  templateUrl: 'block-details.html',
})
export class BlockDetailsPage {
  block: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.block = this.navParams.get('block')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlockDetailsPage');
  }

}
