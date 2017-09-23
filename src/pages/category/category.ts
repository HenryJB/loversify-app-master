import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  areas: string[];
  items = [];

  
  categories: Array<{title: string}>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    
    this.areas = ['Love', 'Dating', 'Relationship', 'Couples Night', 'Sex', 'Honeymoon',
    'Marriage', 'Courtship', 'Romance', 'Lovers'];

    this.categories = [];
    for (let i = 1; i < 11; i++) {
      this.categories.push({
        title:  this.areas[Math.floor(Math.random() * this.areas.length)]
      });
    }

    
    
  }

  itemSelected(event, item){
    
    this.navCtrl.push('PostsPage', {
      title: item
    });
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

  



  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

}
