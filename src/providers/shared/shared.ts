import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController, LoadingController } from 'ionic-angular';

/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedProvider {

  constructor(
    public http: Http, 
    public loading: LoadingController,
    public toastCtrl: ToastController
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

}
