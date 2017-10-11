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
  currentPage: number = 1;
  pageCount: number = 1;
  pageSize: number = 0;


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
      this._sharedService.showBanner();
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

  doInfinite(event) {
    this.currentPage++;
    
    let loader = this._sharedService.loader();
    this.subscription = this._postsService.getCategoryPostsScroll(this.currentPage, this.selectedCategory.id)
    .subscribe((resp) => {
        if (resp.success) {
          
          
          this.posts = this.posts.concat(resp.data);
          this.pageCount = resp.pagecount;
          this.pageSize = resp.totalcount;
        }
        event.complete();
        event.enable( (this.pageSize > 0 && this.currentPage != this.pageCount) )
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

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
