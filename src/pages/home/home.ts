import { Component } from '@angular/core';
import { IonicPage, PopoverController, ModalController, NavController, Platform, Events } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { SharedProvider } from '../../providers/shared/shared';
import { AdmobproProvider } from '../../providers/admobpro/admobpro';
import { AuthProvider } from '../../providers/auth/auth';
import { AppRate } from '@ionic-native/app-rate';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html' 
})
export class HomePage {
 
  blocks: Array<any>;
  constructor(
    public popoverCtrl: PopoverController, 
    public modalCtrl: ModalController,
    public _sharedService: SharedProvider,
    public _authService: AuthProvider,
    public navCtrl: NavController,
    platform: Platform,
    public _admobpro: AdmobproProvider,
    public events: Events 
  ) {}

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create('MyPopoverPage');
      popover.present({
        ev: myEvent
      });
  }


  ionViewDidLoad() {
    
    this._admobpro.show();
    
    if (this._authService.loggedIn()) {
      let loader = this._sharedService.loader();
      loader.present();
      let user = this._authService.currentUser();
      this.events.publish('user:currentUser', user);
      this._sharedService.getWelcomeMessage(user.birthday, user.country, user.gender, user.relationship_status, 1)
      .subscribe((res) => {
        loader.dismiss();
        this.blocks = res.data || [];
        
      }, err => {
        loader.dismiss();
        this._sharedService.toaster('Something went wrong but you can continue');
      })
    } else {
      this._sharedService.toaster('Please login');
      this.navCtrl.setRoot('LoginPage'); 
    }
  }

  doRefresh(refresher) {
    let user = this._authService.currentUser();
    this._sharedService.getWelcomeMessage(user.birthday, user.country, user.gender, user.relationship_status, 1)
    .subscribe((res) => {
      refresher.complete();
      this.blocks = res.data || [];
    }, err => {
      refresher.complete();
      this._sharedService.toaster('Something went wrong but you can continue');
    })
    
  }

  readMoreOnblock(block) {
    this.navCtrl.push('BlockDetailsPage', { block: block });
  }

  openSearch() {
    const searchModal = this.modalCtrl.create(SearchPage)
    searchModal.present();
  }


  

}
