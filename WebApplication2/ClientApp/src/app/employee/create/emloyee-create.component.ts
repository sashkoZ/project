import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JobTypeEnum } from '../job-type/job-type';
import { EmployeeService } from '../../Services/employee.services';
import { AppUsersService } from '../../Services/users.service';
import { OrganizationService } from '../../Services/organization.services';


@Component({
  selector: 'employee-create',
  templateUrl: './employee-create.component.html',
  providers: [EmployeeService, AppUsersService, OrganizationService]
})

export class EmployeeCreateComponent implements OnInit {
  constructor( private router: Router, private employeeService: EmployeeService, private appUsersService: AppUsersService, private organizationService: OrganizationService ) {
  }
  _myForm: FormGroup;
  _users: Array<any>;
  _organizations: Array<any>;
  _jobTypes = JobTypeEnum;
  ngOnInit() {
    this.appUsersService.getAppUsers().subscribe((data: any) => {
      console.log(data);
      this._users = data;
    });
    this.organizationService.getOrganizations().subscribe((data: any) => {
      console.log(data);
      this._organizations = data;
    });
    this._myForm = new FormGroup({
      description: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      appUserId: new FormControl(null, [Validators.required]),
      organizationId: new FormControl(null, [Validators.required]),
      jobType: new FormControl(null, [Validators.required])
    });
  }
  onSubmit() {
    this.employeeService.saveEmployee(this._myForm.value)
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['employee']);
    });
  }
}
