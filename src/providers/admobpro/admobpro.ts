import { Injectable} from '@angular/core';
import { Platform } from 'ionic-angular';
import { AdMobPro } from '@ionic-native/admob-pro';
import 'rxjs/add/operator/map';


@Injectable()
export class AdmobproProvider {

  constructor(private admob: AdMobPro, private platform: Platform ) { }
  
  dismissed() {
    this.admob.onAdDismiss()   
  }
  
  show() {
    let adId;
    if(this.platform.is('android')) {
      adId = 'ca-app-pub-3055791092965383/8889209351';
    } else if (this.platform.is('ios')) {
      adId = 'ca-app-pub-3055791092965383/7772402951';
    }
    this.admob.prepareInterstitial({
      adId: adId,
      position: this.admob.AD_POSITION.BOTTOM_CENTER, 
      autoShow: true, 
      isTesting: false})
      .then(() => { 
        this.admob.showInterstitial();
        this.createBanner(); 
      }).catch((err) => { alert(err) });
  }


  createBanner() {
    let adId;
    if(this.platform.is('android')) {
      adId = 'ca-app-pub-3055791092965383/8889209351';
    } else if (this.platform.is('ios')) {
      adId = 'ca-app-pub-3055791092965383/7772402951';
    }
    this.admob.createBanner({
      adId: adId,
      position: this.admob.AD_POSITION.BOTTOM_CENTER, 
      autoShow: true
    }).then(() => {

    }).catch((err) => {
      console.log(err);
    })
  }
   	
   	

   	
}