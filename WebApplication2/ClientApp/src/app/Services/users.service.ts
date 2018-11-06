import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class AppUsersService {
  myAppUrl: string = "";
  headers = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getAppUsers() {
    return this._http.get(this.myAppUrl + 'api/account', { headers: this.headers })
  }
  getAppUser(id) {
    return this._http.get(this.myAppUrl + 'api/account' + id, { headers: this.headers })
  }
}  
