import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastController, LoadingController, Platform } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedProvider {
  private host = 'http://app.loversify.com/api';

  constructor(
    public http: Http, 
    public loading: LoadingController,
    public toastCtrl: ToastController,
    public admob: AdMobFree,
    public platform: Platform
  ) {}

  loader(paramsContent?: string) {
    let content = paramsContent || 'loading..' 
    let loader = this.loading.create({
      content: content,
    });
    return loader;
  }


  toaster(paramsContent = 'loading..', paramsPosition = 'top', paramsDuration = 3000) {
    let toast = this.toastCtrl.create({
      message: paramsContent,
      duration: paramsDuration,
      position: paramsPosition
    });
    toast.present();
  }
 
  viewTitle(params: string) : Observable<any> {
    return this.http.get(`${this.host}/pages/view-title/?title=${params}`)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  viewTitleMenu(id) : Observable<any> {
    return this.http.get(`${this.host}/pages/find/?params[parent]=${id}`)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  submitMessage(postParams) : Observable<any> {
    return this.http.post(`${this.host}/default/contact`, postParams)
    .map((res:Response) => res.json()).debounceTime(200).distinctUntilChanged()
    .catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  getWelcomeMessage(age, country, gender, relationship_status) : Observable<any> {
    return this.http.get(`${this.host}/blocks/find/?params[age]=${age}&params[countries]=${country}&params[gender]=${gender}&params[relationship_status]=${relationship_status}&params[type]=${1}`,)
    .map((res:Response) => res.json()).debounceTime(200).distinctUntilChanged()
    .catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  showBanner() {
    let id = this.platform.is('android')? 'ca-app-pub-3055791092965383~8833220954' : 'ca-app-pub-3055791092965383~1309954157'
    let bannerConfig: AdMobFreeBannerConfig = {
        // isTesting: true, // Remove in production
        autoShow: true,
        id: id
    };

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {
        // success
  }).catch(e => console.log(e));
  
}

  

}
