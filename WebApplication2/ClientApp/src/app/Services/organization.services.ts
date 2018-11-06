import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class OrganizationService {
  myAppUrl: string = "";
  headers = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getOrganizations() {
    return this._http.get(this.myAppUrl + 'api/organizations', { headers: this.headers })
  }

  getOrganization(id) {
    return this._http.get(this.myAppUrl + 'api/organizations/' + id, { headers: this.headers })
  }

  saveOrganization(organization) {
    return this._http.post(this.myAppUrl + 'api/organizations', organization, { headers: this.headers })
  }

  updateOrganization(organization, id) {
    return this._http.put(this.myAppUrl + 'api/organizations/' + id, organization, { headers: this.headers })
  }

  deleteOrganization(id) {
    return this._http.delete(this.myAppUrl + "api/organizations/" + id, { headers: this.headers })
  }
}  
