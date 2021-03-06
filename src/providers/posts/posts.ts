import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { tokenNotExpired, JwtHelper, AuthHttp } from 'angular2-jwt';

/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostsProvider {

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) {}



  private host = 'http://app.loversify.com/api';

  getCategoryPosts(id: string) : Observable<any> {
		return this.http.get(`${this.host}/posts/find/?params[category]=${id}`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  getCategoryPostsScroll(page: number, id: string) : Observable<any> {
		return this.http.get(`${this.host}/posts/find/?page=${page}&params[category]=${id}`)
			.map((res:Response) => {
        res['currentpage'] = res.headers.get('X-Pagination-Current-Page');
        res['pagecount'] = res.headers.get('X-Pagination-Page-Count');
        res['totalcount'] = res.headers.get('X-Pagination-Total-Count');
        return res.json();
      })
			.catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  getPostMeta(userId, postId) : Observable<any> {
    return this.http.get(`${this.host}/posts/meta/?post=${postId}&user=${userId}`)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  getPostDetails(userId, postId) : Observable<any> {
    return this.http.get(`${this.host}/posts/view/?id=${postId}&user=${userId}`)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  likePost(userId, postId) : Observable<any> {
    return this.http.get(`${this.host}/posts/like/?post=${postId}&user=${userId}`)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  sharePost(userId, postId) : Observable<any> {
    return this.http.get(`${this.host}/posts/share/?post=${userId}&user=${postId}`)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

  favourite(userId) : Observable<any> {
    return this.http.get(`${this.host}/posts/favorites/?params[user]=${userId}`)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }


  searchPost(postParams) : Observable<any> {
    return this.http.get(`${this.host}/posts/search/?title=${postParams}`)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'server error'));
  }

}
