import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastController, LoadingController } from 'ionic-angular';

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

}
