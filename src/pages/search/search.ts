import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  search: Array<any>;
  hasResult: Boolean = false;
  justVisit: Boolean = true;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public _postsService: PostsProvider,
     public _authProvider: AuthProvider
  ) {}

  ionViewDidLoad() {
    
  }

  onInput(input) {
    this.justVisit = false;
    this._postsService.searchPost(input.target.value)
    .subscribe((res) => {
      if (res.success) {
        if (res.data.length > 0) {
          this.hasResult = true;
          this.search = res.data;
        } else {
          this.hasResult = false;
        }
      }
    })
  }

  goToContact() {
    this.navCtrl.push('contactPage')
  }

  showPostDetails(id) {
    let userId = this._authProvider.currentUser().id;
    this.navCtrl.push('PostdetailPage',  {userMeta: { user: userId, post: id } });
  }
}
