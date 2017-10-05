import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { CategoryProvider } from '../../providers/category/category';
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
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _categoryService: CategoryProvider,
    public _sharedService: SharedProvider,
    public toastCtrl: ToastController
  ) { 
    this._sharedService.showBanner();
    this.subCategory = this.navParams.get('subCategory');
  }

  ionViewDidLoad() {
    if (this.subCategory) {
      this.getSubCategories(this.subCategory);
    } else {
      this.getCategories();
    }
  }

  getCategories() {
    let loader = this._sharedService.loader();
    loader.present();
    this.subscription = this._categoryService.getCategories()
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



  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');

  //   setTimeout(() => {
  //     for (let i = 0; i < 11; i++) {
  //       this.categories.push( {
  //         title:  this.areas[Math.floor(Math.random() * this.areas.length)]
  //       } );
  //     }

  //     console.log('Async operation has ended');
  //     infiniteScroll.complete();
  //   }, 500);
  // }
}
