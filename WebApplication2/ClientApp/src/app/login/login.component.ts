import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavMenuService } from '../nav-menu-service/nav-menu.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(private httpClient: HttpClient, private router: Router, private navMenuService: NavMenuService) {
  }
  _myForm: FormGroup;
  ngOnInit() {
    this._myForm = new FormGroup({
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }
  onSubmit() {
    this.httpClient.post('api/account/login', this._myForm.value)
      .subscribe((data: any) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('Token - ' + data.token);
          this.navMenuService.show();
          this.router.navigate(['']);
        }
      });
  }
}


