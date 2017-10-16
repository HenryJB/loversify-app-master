import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { tokenNotExpired, JwtHelper, AuthHttp } from 'angular2-jwt';


@Injectable()
export class CategoryProvider {

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) {}

  private host = 'http://app.loversify.com/api';

  getCategories() : Observable<any> {
		return this.http.get(`${this.host}/categories/find/?params[parent]=0`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  getSubCategories(id) : Observable<any> {
		return this.http.get(`${this.host}/categories/find/?params[parent]=${id}`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  



}
