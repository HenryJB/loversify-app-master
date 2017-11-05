import { Component, ViewChild } from '@angular/core';
import { Nav, NavController,  PopoverController, ModalController, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { SharedProvider } from  '../providers/shared/shared';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  profileImage: String;


  rootPage: any; 

  pages: Array<{title: string, component: any, icon: any}>;
  currentUser: any;

  constructor(
    
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public _authService: AuthProvider,
    public _sharedService: SharedProvider,
    public events: Events
  ) {
    this.profileImage = this._authService.getImage('profileImage');
    events.subscribe('user:picture', (picture) => {
      this.profileImage = picture;
    });
  
    if (this._authService.loggedIn()) {
      this.rootPage = 'HomePage';
    } else {
      this.rootPage = 'LoginPage'
    }
    splashScreen.show();
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Posts', component: 'CategoryPage' , icon :'paper'},
      { title: 'Favourites', component: 'FavouritePage' , icon :'heart'},
      { title: 'Resources', component: 'ResourcesPage' , icon :'book'},
      { title: 'Profile', component: 'ProfilePage' , icon :'contact'},
      { title: 'Help and Feedback', component: 'HelpPage'  , icon :'help-buoy'},
      { title: 'Logout', component: 'LoginPage' , icon :'log-out'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      setTimeout( () => this.splashScreen.hide(), 5000)
      if (this._authService.loggedIn()) {
        this.currentUser = this._authService.currentUser();
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  

  
}
