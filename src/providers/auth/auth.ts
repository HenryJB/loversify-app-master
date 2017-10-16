import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { tokenNotExpired, JwtHelper, AuthHttp } from 'angular2-jwt';



@Injectable()
export class AuthProvider {

  constructor(
    public http: Http,
    public authHttp: AuthHttp
     ) {
  }

  private host = 'http://app.loversify.com/api'


  login(accountInfo: any) : Observable<any> {
		return this.http.post(`${this.host}/default/login`, accountInfo)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  signup(accountInfo: any) : Observable<any> {
		return this.http.post(`${this.host}/default/sign-up`, accountInfo)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  update(accountInfo: any) : Observable<any> {
		return this.http.post(`${this.host}/users/update`, accountInfo)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  getContries() : Observable<any> {
		return this.http.get(`assets/countries.json`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  loggedIn() {
    return tokenNotExpired();
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('JWT');
  }

  tokenSubscription() {
    this.authHttp.tokenStream.subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('Complete')
    );
  }


  saveToken(tokenName, token) {
    localStorage.setItem(tokenName, token);
  }

  
  currentUser() {
    if (this.loggedIn()) {
      let jwtHelper: JwtHelper = new JwtHelper();
      let token = this.getToken('token');
      return jwtHelper.decodeToken(token).uid;
    }
  }



  getToken(token: string) {
    return (localStorage.getItem(token));
  }

}

