import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { tokenNotExpired, JwtHelper, AuthHttp } from 'angular2-jwt';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) {}

  private host = 'http://app.loversify.com/api';

  getCategories() : Observable<any> {
		return this.http.get(`${this.host}/categories`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  getSubCategories(id) : Observable<any> {
		return this.http.get(`${this.host}/categories/find/?params[parent]=${id}`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  



}
