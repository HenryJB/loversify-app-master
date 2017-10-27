import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, ModalController, ToastController, NavParams } from 'ionic-angular';
import { CategoryProvider } from '../../providers/category/category';
import { SearchPage } from '../search/search';
import { SharedProvider } from '../../providers/shared/shared';
import { ISubscription } from "rxjs/Subscription";
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  
  items = [];
  categories: Array<any>;
  subscription: ISubscription;
  subCategory;
  subCategoryName: undefined;
  blocks: any;
 
  
  constructor(
    public popoverCtrl: PopoverController, 
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _categoryService: CategoryProvider,
    public _sharedService: SharedProvider,
    public toastCtrl: ToastController,
    public _authService: AuthProvider
  ) { 
    this._sharedService.showBanner();
    this.subCategory = this.navParams.get('subCategory');
  }

  ionViewDidLoad() {
    
    if (this.subCategory) {
      this.getSubCategories(this.subCategory);
    } else {
      this.getCategories()
    }
  }

  getCategories() {
    let loader = this._sharedService.loader();
    loader.present();
    this.subscription = this._categoryService.getCategories()
    .subscribe((resp) => {
      this.getBlocks(loader);
       if (resp.success) {
         this.categories = resp.data;
       }
    }, err => {
      loader.dismiss();
      this._sharedService.toaster('internal server error');
   })
  }

  doRefresh(refresher) {
    refresher.complete();
  }

  getSubCategories(subCategory) {
    let loader = this._sharedService.loader();
    loader.present();
    this.subscription = this._categoryService.getSubCategories(subCategory.id)
    .subscribe((resp) => {
     loader.dismiss();
       if (resp.success) {
         this.categories = resp.data;
       }
    }, err => {
      loader.dismiss();
      this._sharedService.toaster('internal server error');
   })
  }

  itemSelected(event, item) {
    this.subCategoryName = item.name;
    if (item.has_children > 0) {
      this.navCtrl.push('CategoryPage', { subCategory: item })  
    } else {
        this.navCtrl.push('PostsPage', {
          category: item
        });
    }
  }


  onPageWillLeave() {
    this.subscription.unsubscribe();
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

getBlocks(loader) {
  if (this._authService.loggedIn()) {
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
}
