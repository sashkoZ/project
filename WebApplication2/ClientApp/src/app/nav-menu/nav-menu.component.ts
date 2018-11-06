import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavMenuService } from '../nav-menu-service/nav-menu.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(private router: Router, private navMenuService: NavMenuService) {
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logOut() {
    localStorage.removeItem('token');
    this.navMenuService.hide();
    this.router.navigate(['login']);
  }
 }
