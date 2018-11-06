import { Component, OnInit } from '@angular/core';
import { NavMenuService } from './nav-menu-service/nav-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
  title = 'app';
  constructor(private navMenuService: NavMenuService) {

  }
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.navMenuService.showMenu = true;
    }
    
  }
}
