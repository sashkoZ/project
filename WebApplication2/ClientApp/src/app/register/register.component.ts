import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  constructor(private httpClient: HttpClient, private router: Router) {
  }
  _myForm: FormGroup;
  ngOnInit() {
    this._myForm = new FormGroup({
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required])
    });
  }
  onSubmit() {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.httpClient.post('api/account/register', this._myForm.value, { headers: headers })
      .subscribe((data: any) => {
        this.router.navigate(['login']);
      });
  }
}


