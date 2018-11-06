import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeeService {
  myAppUrl: string = "";
  headers = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getEmployees() {
    return this._http.get(this.myAppUrl + 'api/employees', { headers: this.headers })
  }

  getEmployee(id) {
    return this._http.get(this.myAppUrl + 'api/employees/' + id, { headers: this.headers })
  }

  saveEmployee(employee) {
    return this._http.post(this.myAppUrl + 'api/employees', employee, { headers: this.headers })
  }

  updateEmployee(employee, id) {
    return this._http.put(this.myAppUrl + 'api/employees/' + id, employee, { headers: this.headers })
  }

  deleteEmployee(id) {
    return this._http.delete(this.myAppUrl + "api/employees/" + id, { headers: this.headers })
  }
}  
