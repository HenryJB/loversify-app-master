import { Component } from '@angular/core';
import { IonicPage, PopoverController, ModalController, NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { SharedProvider } from '../../providers/shared/shared';
//import { AdmobproProvider } from '../../providers/admobpro/admobpro';
import { AuthProvider } from '../../providers/auth/auth';

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
    //public adMobService : AdmobproProvider
  ) {
    //this.adMobService.showBanner();
    this._sharedService.showBanner();
   
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
  }

  openSearch() {
    const searchModal = this.modalCtrl.create(SearchPage)
    searchModal.present();
  }


  

}
