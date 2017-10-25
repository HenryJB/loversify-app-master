import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, ModalController,  NavParams } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';
import {SearchPage} from  '../search/search';


@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  help: Object;
  menu: Array<any>;
  constructor(
    public popoverCtrl: PopoverController, 
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _sharedService: SharedProvider
  ) {}

  ionViewDidLoad() {
    this.loadHelp();
  }

  loadHelp() {
    let loader = this._sharedService.loader();
    loader.present();
    this._sharedService.viewTitle('help')
    .subscribe((res) => {
      if (res.success) {
        this.help = res.data;
        this.loadHelpMenu(loader, res.data.id);
      } else {
        this._sharedService.toaster('Something wrong');
      }
    }, err => {
      loader.dismiss();
      this._sharedService.toaster('Server error');
    })
  }

  loadHelpMenu(loader, id) {
    this._sharedService.viewTitleMenu(id)
    .subscribe((res) => {
      loader.dismiss();
      if (res.success) {
        this.menu = res.data;
      } else {
        this._sharedService.toaster('Something wrong');
      }
    }, err => {
      loader.dismiss();
      this._sharedService.toaster('Server error');
    })
  }

  goToContactUs() {
    this.navCtrl.push('ContactPage')
  }

  itemSelected(item) {
    if (item.title == "About Us") {
      this.navCtrl.push('AboutPage', { item: item });
    } else {
      this.navCtrl.push('HowToUsePage', {item: item});
    }
    
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
