import { Component } from '@angular/core';
import { NavController, NavParams , IonicPage} from 'ionic-angular';
import { CategoryProvider } from '../../providers/category/category';
import { SharedProvider } from '../../providers/shared/shared';
import { PostsProvider } from '../../providers/posts/posts';
import { ISubscription } from "rxjs/Subscription";
import { AuthProvider } from '../../providers/auth/auth';
import { PostdetailPage } from '../../pages/postdetail/postdetail';


@IonicPage()
@Component({
  selector: 'page-favourite',
  templateUrl: 'favourite.html'
})
export class FavouritePage {
  selectedItem: any;
  icons: string[];
  items: Array<any>;
  subscription: ISubscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _postsService: PostsProvider,
    public _sharedService: SharedProvider,
    public _authProvider: AuthProvider
  ) {}

  



  ionViewDidLoad() {
    this.getFavouritePosts();
  }


  getFavouritePosts() {
    let loader = this._sharedService.loader();
    loader.present();
    this.subscription = this._postsService.favourite(this._authProvider.currentUser().id)
    .subscribe((resp) => {
      loader.dismiss();
        if (resp.success) {
          this.items = resp.data;
        }
      }, err => {
          loader.dismiss();
          this._sharedService.toaster('internal server error');
    })
  }

 

  openPost(item) {
    let userId = this._authProvider.currentUser().id;
    this.navCtrl.push('PostdetailPage',  {userMeta: { user: userId, post: item.post.id } });
  }


  
}

