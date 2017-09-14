import { Component } from '@angular/core';
import { IonicPage, PopoverController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public popoverCtrl: PopoverController) {

  }

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create('MyPopoverPage');
      popover.present({
        ev: myEvent
      });
  }

  

}
