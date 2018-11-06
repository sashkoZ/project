import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { OrganizationService } from '../../Services/organization.services';

@Component({
  selector: 'organization-update',
  templateUrl: './organization-update.component.html',
  providers: [DatePipe, OrganizationService]
})

export class OrganizationUpdateComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, private _datePipe: DatePipe,
    private organizationService: OrganizationService) {
  }
  _myForm: FormGroup;
  ngOnInit() {
    
    this._myForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      createDate: new FormControl(null, [Validators.required]),
    });
    this.organizationService.getOrganization(this.activatedRoute.snapshot.paramMap.get('organization-id')).subscribe((data: any) => {
      console.log(data);
      this._myForm.get('name').setValue(data.name);
      this._myForm.get('description').setValue(data.description);
      this._myForm.get('createDate').setValue(this._datePipe.transform(data.createDate, 'yyyy-MM-dd'));
    });
  }
  onSubmit() {
    this.organizationService.updateOrganization(this._myForm.value, this.activatedRoute.snapshot.paramMap.get('organization-id'))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['organization']);
      });
  }
}
