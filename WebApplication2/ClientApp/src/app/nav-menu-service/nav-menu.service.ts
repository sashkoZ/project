import { Injectable } from '@angular/core';

@Injectable()
export class NavMenuService {

  public showMenu: boolean = false; 
  constructor() { }
  public show() {
    this.showMenu = true;
  }
  public hide() {
    this.showMenu = false;
  }
}
