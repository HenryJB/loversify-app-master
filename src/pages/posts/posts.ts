import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, NavParams } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';
import { ISubscription } from "rxjs/Subscription";
import { SharedProvider } from '../../providers/shared/shared';
import { AuthProvider } from '../../providers/auth/auth';



@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {
  selectedCategory: any;
  title: string;
  subscription: ISubscription;
  posts: Array<any>;


  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public _postsService: PostsProvider,
     public _sharedService: SharedProvider,
     public _authProvider: AuthProvider,
     public popoverCtrl: PopoverController
    ) {
      this.selectedCategory = navParams.get('category');
      this.title = this.selectedCategory.name;
  }

  ionViewDidLoad() {
    this.getCategoryPosts();
  }

  getCategoryPosts() {
    let loader = this._sharedService.loader();
    loader.present();
    this.subscription = this._postsService.getCategoryPosts(this.selectedCategory.id)
    .subscribe((resp) => {
      loader.dismiss();
        if (resp.success) {
          this.posts = resp.data;
        }
     }, err => {
          loader.dismiss();
          this._sharedService.toaster('internal server error');
    })
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('MyPopoverPage');
    popover.present({
      ev: myEvent
    });
  }

  

  showPostDetails(id) {
    let userId = this._authProvider.currentUser().id;
    this.navCtrl.push('PostdetailPage',  {userMeta: { user: userId, post: id } });
  }

}
