import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() { }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('logged');
      return true;
    }
    console.log('not logged');
    return false;
  }
}
