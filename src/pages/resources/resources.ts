import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';
/**
 * Generated class for the ResourcesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resources',
  templateUrl: 'resources.html',
})
export class ResourcesPage {
  menu: any;
  help: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public _sharedService: SharedProvider) {
  }

  ionViewDidLoad() {
    this.loadHelp();
  }

  

  loadHelp() {
    let loader = this._sharedService.loader();
    loader.present();
    this._sharedService.viewTitle('resources')
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

  itemSelected(item) {
    this.navCtrl.push('ResouresPagesPage', { item: item }); 
  }

  

}
