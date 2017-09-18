import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {
  selectedCategory: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedCategory = navParams.get('title');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
  }

  

  showPostDetails(){
    this.navCtrl.push('PostdetailPage');
  }

}
