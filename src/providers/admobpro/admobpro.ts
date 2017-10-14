import { Injectable} from '@angular/core';
import { Platform } from 'ionic-angular';
import { AdMobPro } from '@ionic-native/admob-pro';
import 'rxjs/add/operator/map';


@Injectable()
export class AdmobproProvider {
  private  admobid;
  private _opt;
  constructor( platform: Platform, private adMob: AdMobPro ) {
    platform.ready().then(() => {
      var admobid = {
          banner: 'ca-app-pub-3055791092965383/8889209351',
          interstitial: ''
      };

      // this.adMob.createBanner({
      //     adId: admobid.banner,
      //     isTesting: true,
      //     autoShow: true,
      //     position: this.adMob.AD_POSITION.BOTTOM_CENTER
      // })

      // this.adMob.prepareInterstitial({
      //     adId: admobid.interstitial,
      //     isTesting: true,
      //     autoShow: false
      // })

      this.init();
  });
  }

  init(){
  	console.log("AdMob init");
  	if( !AdMobPro ){
  		console.log("No AdMob?");
  		return;
  	} 

   	// Register AdMob events
   	// new events, with variable to differentiate: adNetwork, adType, adEvent
   	
   	document.addEventListener('onAdFailLoad', function(data){
		console.log('onAdFailLoad: ' + JSON.stringify(data));
	});
	
   	document.addEventListener('onAdLoaded', function(data){
		console.log('onAdLoaded: ' + JSON.stringify(data));
   	});
   	
	document.addEventListener('onAdPresent', function(data){
		console.log('onAdPresent: ' + JSON.stringify(data));
   	});
   	document.addEventListener('onAdLeaveApp', function(data){
    	console.log('onAdLeaveApp: ' + JSON.stringify(data));
   	});

   	document.addEventListener('onAdDismiss', function(data){
    	console.log('onAdDismiss: ' + JSON.stringify(data));
   	});
   	

   	this._opt = {
		// bannerId: admobid.banner,
		// interstitialId: admobid.interstitial,
		// adSize: 'SMART_BANNER',
		// width: integer, // valid when set adSize 'CUSTOM'
		// height: integer, // valid when set adSize 'CUSTOM'
		position: this.adMob.AD_POSITION.BOTTOM_CENTER,
		// offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
		bgColor: 'black', // color name, or '#RRGGBB'
		// x: integer,     // valid when set position to 0 / POS_XY
		// y: integer,     // valid when set position to 0 / POS_XY
		isTesting: true, // set to true, to receiving test ad for testing purpose
		// autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
   	};

   	this.adMob.setOptions(this._opt);
   	this.showBanner();
  }

  showInterstitial(){
  	if( !AdMobPro ) return false;
  	console.log("showInterstitial");
    this.adMob.prepareInterstitial({
	    adId: this.admobid.interstitial,
	    autoShow: true
   	})

   	return true;
  }

  showBanner(){
  	if( !AdMobPro ) return false;

  	console.log("showBanner" );
	this.adMob.createBanner({
	    adId: this.admobid.banner,
	    position: this.adMob.AD_POSITION.BOTTOM_CENTER,
	    autoShow: true
	})
	return true;
  }

 removeAds() {
   		if( AdMobPro ) this.adMob.removeBanner();
   	}


   	
   	

   	
}