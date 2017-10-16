import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';
/**
 * Generated class for the WhyIShouldSignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-why-i-should-signup',
  templateUrl: 'why-i-should-signup.html',
})
export class WhyIShouldSignupPage {
  help: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _sharedService: SharedProvider) {
  }

  ionViewDidLoad() {
    this.loadHelp();
  }

  loadHelp() {
    let loader = this._sharedService.loader();
    loader.present();
    this._sharedService.viewTitle('why-sign-up')
    .subscribe((res) => {
      if (res.success) {
        this.help = res.data;
        loader.dismiss();
      } else {
        this._sharedService.toaster('Something wrong');
        loader.dismiss();
      }
    }, err => {
      loader.dismiss();
      this._sharedService.toaster('Server error');
    })
  }

}
