import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, Content, Platform } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';
import { ISubscription } from "rxjs/Subscription";
import { SharedProvider } from '../../providers/shared/shared';
import { AuthProvider } from '../../providers/auth/auth';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import {SearchPage} from '../search/search';
import {SafehtmlPipe} from '../../pipes/safehtml/safehtml'
import { AppRate } from '@ionic-native/app-rate';

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
  blocks: any;
  imageUrl: String = 'http://app.loversify.com/assets/web/uploads/';
  @ViewChild(Content) content: Content;

  constructor(
    public popoverCtrl: PopoverController, 
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _postsService: PostsProvider,
    public _sharedService: SharedProvider,
    public _authService: AuthProvider,
    private socialSharing: SocialSharing,
    private clipboard: Clipboard,
    private appRate: AppRate,
    public platform: Platform
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

 

  doRefresh(refresher) {
    refresher.complete();
  }



  getPostDetails(userMeta, loader) {
    this.subscription = this._postsService.getPostDetails(userMeta.user, userMeta.post)
    .subscribe((resp) => {
      if (resp.success) {
        this.details = resp.data;
        this.size = resp.data.posts.length;
        this.getBlocks(loader);
      }
    }, err => {
      loader.dismiss();
      this._sharedService.toaster('internal server error');
    })
  }

  getBlocks(loader) {
    if (this._authService.loggedIn()) {
      let user = this._authService.currentUser();
      this._sharedService.getWelcomeMessage(user.birthday, user.country, user.gender, user.relationship_status, 2)
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

  readMoreOnblock(block) {
    this.navCtrl.push('BlockDetailsPage', { block: block });
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
      this.share(this.userMeta.user, this.userMeta.post);
    }).catch((err) => {
      this._sharedService.toaster('share error');
    })
  }

  shareViaFacebook() {
    this.socialSharing.shareViaFacebook(this.postDetails(), null, 'https://goo.gl/oH7UuA').then(() => {
      this.share(this.userMeta.user, this.userMeta.post);
    }).catch((err) => {
      this._sharedService.toaster('share error');
    })
  }

  shareViaTwitter() {
    this.postDetails();
    this.socialSharing.shareViaTwitter(this.postDetails(), null, 'https://goo.gl/oH7UuA').then(() => {
      this.share(this.userMeta.user, this.userMeta.post);
    }).catch((err) => {
      this._sharedService.toaster('share error');
    })
  }

  share(post, user) {
    this.subscription = this._postsService.sharePost(user, post)
    .subscribe((resp) => {
      this.platform.ready().then(() => {
        this.appRate.preferences = {
          openStoreInApp: false,
          displayAppName: 'Loversify',
          usesUntilPrompt: 2,
          promptAgainForEachNewVersion: true,
          storeAppURL: {
            ios: '1216856883',
            android: 'market://details?id=com.loversify.loversify'
          },
          customLocale: {
            title: 'Do you enjoy %@?',
            message: 'If you enjoy using %@, would you mind taking a moment to rate it? Thanks so much!',
            cancelButtonLabel: 'No, Thanks',
            laterButtonLabel: 'Remind Me Later',
            rateButtonLabel: 'Rate It Now'
          },
          callbacks: {
            onRateDialogShow: function(callback){
              console.log('rate dialog shown!');
            },
            onButtonClicked: function(buttonIndex){
              console.log('Selected index: -> ' + buttonIndex);
            }
          }
        };
   
        // Opens the rating immediately no matter what preferences you set
        this.appRate.promptForRating(true);
      });
    }, (err) => {
      this._sharedService.toaster('Unable to make your share count');
    })
  }

  postDetails(): string {
    var message = '';
    message += this.details.title+'\n \n';
    message += this.details.description +'\n \n';
    return message.replace(/<[^>]+>/gm, '');
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
    this.content.scrollToTop();
  }

  prev() {
    this.currentPage--;
    this.content.scrollToTop();
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
