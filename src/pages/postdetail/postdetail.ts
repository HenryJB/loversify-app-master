import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';
import { ISubscription } from "rxjs/Subscription";
import { SharedProvider } from '../../providers/shared/shared';
import { AuthProvider } from '../../providers/auth/auth';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';



@IonicPage()
@Component({
  selector: 'page-postdetail',
  templateUrl: 'postdetail.html',
})
export class PostdetailPage {

  userMeta: any;
  subscription: ISubscription;
  details: any;
  userMetalResponse: any;
  currentPage: number = 0;
  size: number = 0;



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _postsService: PostsProvider,
    public _sharedService: SharedProvider,
    public _authService: AuthProvider,
    private socialSharing: SocialSharing,
    private clipboard: Clipboard
  ) {
    this.userMeta = this.navParams.get('userMeta');
  }

  ionViewDidLoad() {
    this.getMetaDetails(this.userMeta);
  }

  getMetaDetails(userMeta) {
    let loader = this._sharedService.loader();
    loader.present();
    this.subscription = this._postsService.getPostMeta(userMeta.user, userMeta.post)
    .subscribe((resp) => {
      if (resp.success) {
        this.userMetalResponse = resp.data;
        this.userMetalResponse.is_like = resp.data.is_like;
        this.getPostDetails(userMeta, loader);
      }
    }, err => {
      loader.dismiss();
      this._sharedService.toaster('internal server error');
    })
  }

  getPostDetails(userMeta, loader) {
    this.subscription = this._postsService.getPostDetails(userMeta.user, userMeta.post)
    .subscribe((resp) => {
      if (resp.success) {
        this.details = resp.data;
        this.size = resp.data.posts.length;
        loader.dismiss();
      }
    }, err => {
      loader.dismiss();
      this._sharedService.toaster('internal server error');
    })
  }

  like() {
    this.subscription = this._postsService.likePost(this.userMeta.user, this.userMeta.post)
    .subscribe((resp) => {
      if (resp.success)  {
        if (resp.data === 1) {
            this.userMetalResponse.is_like = 0;
            this._sharedService.toaster('Post removed from Favorites');
        } else {
          this.userMetalResponse.is_like = 1;
          this._sharedService.toaster('Post added to Favorites');
        }
      } else {
        this._sharedService.toaster('operation failed');
      }
    }, err => {
      this._sharedService.toaster('internal server error');
    })
  }

  shareViaWhatsApp() {
    this.socialSharing.shareViaWhatsApp(this.postDetails(), null, 'https://goo.gl/oH7UuA').then(() => {
      this._sharedService.toaster('Thanks for sharing');
      this.share(this.userMeta.user, this.userMeta.post);
    }).catch((err) => {
      this._sharedService.toaster('share error');
    })
  }

  shareViaFacebook() {
    this.socialSharing.shareViaFacebook(this.postDetails(), null, 'https://goo.gl/oH7UuA').then(() => {
      this._sharedService.toaster('Thanks for sharing');
      this.share(this.userMeta.user, this.userMeta.post);
    }).catch((err) => {
      this._sharedService.toaster('share error');
    })
  }

  shareViaTwitter() {
    console.log('welcome', this.postDetails())
    this.socialSharing.shareViaTwitter(this.postDetails(), null, 'https://goo.gl/oH7UuA').then(() => {
      this._sharedService.toaster('Thanks for sharing');
      this.share(this.userMeta.user, this.userMeta.post);
    }).catch((err) => {
      this._sharedService.toaster('share error');
    })
  }

  share(post, user) {
    this.subscription = this._postsService.sharePost(user, post)
    .subscribe((resp) => {
    }, (err) => {
      this._sharedService.toaster('Unable to make your share count');
    })
  }

  postDetails(): string {
    var message = '';
    message += this.details.title+'\n \n';
    //message += post.description+'\n \n';
    message += this.details.posts[0] +'\n \n';
    return message
  }

  copy() {
    this.clipboard.copy(this.postDetails()).then(
       (resolve: string) => {
        this._sharedService.toaster('Copied to clipboard');
        },
        (reject: string) => {
          this._sharedService.toaster('operation failed');
        }
      );
  }

  next() {
    this.currentPage++;
  }

  prev() {
    this.currentPage--;
  }


  
  
}
