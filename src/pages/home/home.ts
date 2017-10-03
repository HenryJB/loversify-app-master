import { Component } from '@angular/core';
import { IonicPage, PopoverController, ModalController } from 'ionic-angular';
import { SearchPage } from '../search/search'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public popoverCtrl: PopoverController, public modalCtrl: ModalController) {

  }

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create('MyPopoverPage');
      popover.present({
        ev: myEvent
      });
  }

  openSearch() {
    const searchModal = this.modalCtrl.create(SearchPage)
    searchModal.present();
  }

  

}
