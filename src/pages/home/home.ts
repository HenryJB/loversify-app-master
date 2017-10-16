import { Component } from '@angular/core';
import { IonicPage, PopoverController, ModalController, NavController, Platform } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { SharedProvider } from '../../providers/shared/shared';
import { AdmobproProvider } from '../../providers/admobpro/admobpro';
import { AuthProvider } from '../../providers/auth/auth';
import { AdMobPro } from '@ionic-native/admob-pro';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  //providers: [AdmobproProvider]
 
})
export class HomePage {
 
  blocks: Array<any>;
  constructor(
    public popoverCtrl: PopoverController, 
    public modalCtrl: ModalController,
    public _sharedService: SharedProvider,
    public _authService: AuthProvider,
    public navCtrl: NavController,
    private admob: AdMobPro, 
    private platform: Platform
  ) {
    
  }

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create('MyPopoverPage');
      popover.present({
        ev: myEvent
      });
  }


  ionViewDidLoad() {
    
    if (this._authService.loggedIn()) {
      let loader = this._sharedService.loader();
      loader.present();
      let user = this._authService.currentUser();
      this._sharedService.getWelcomeMessage(user.birthday, user.country, user.gender, user.relationship_status)
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

    this.platform.ready().then(() => {
      let adId;
      if(this.platform.is('android')) {
        adId = 'ca-app-pub-3055791092965383~8833220954';
      } else if (this.platform.is('ios')) {
        adId = 'ca-app-pub-3055791092965383~1309954157';
      }
      this.admob.prepareInterstitial({adId: adId})
        .then(() => { this.admob.showInterstitial(); });
    })
  }

  openSearch() {
    const searchModal = this.modalCtrl.create(SearchPage)
    searchModal.present();
  }


  

}
