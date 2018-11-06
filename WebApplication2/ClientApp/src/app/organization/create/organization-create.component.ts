import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganizationService } from '../../Services/organization.services';

@Component({
  selector: 'organization-create',
  templateUrl: './organization-create.component.html',
  providers: [OrganizationService]
})

export class OrganizationCreateComponent implements OnInit {
  constructor(private router: Router, private organizationService: OrganizationService) {
  }
  _myForm: FormGroup;
  ngOnInit() {
    
    this._myForm = new FormGroup({
      description: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      createDate: new FormControl(null, [Validators.required]),
    });
  }
  onSubmit() {
    this.organizationService.saveOrganization(this._myForm.value)
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['organization']);
      });
  }
}
