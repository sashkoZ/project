import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { JobTypeEnum } from '../job-type/job-type';
import { EmployeeService } from '../../Services/employee.services';
import { OrganizationService } from '../../Services/organization.services';

@Component({
  selector: 'employee-update',
  templateUrl: './employee-update.component.html',
  providers: [DatePipe, EmployeeService, OrganizationService]
})

export class EmployeeUpdateComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, private _datePipe: DatePipe,
    private employeeService: EmployeeService, 
    private organizationService: OrganizationService) {
  }
  _myForm: FormGroup;
  _organizations: Array<any>;
  _jobTypes = JobTypeEnum;
  ngOnInit() {
    
    this.organizationService.getOrganizations().subscribe((data: any) => {
      console.log(data);
      this._organizations = data;
    });
    this._myForm = new FormGroup({
      description: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      organizationId: new FormControl(null, [Validators.required]),
      jobType: new FormControl(null, [Validators.required])
    });
    this.employeeService.getEmployee(this.activatedRoute.snapshot.paramMap.get('employee-id')).subscribe((data: any) => {
      console.log(data);
      this._myForm.get('startDate').setValue(this._datePipe.transform(data.startDate, 'yyyy-MM-dd'));
      this._myForm.get('organizationId').setValue(data.organizationId);
      this._myForm.get('description').setValue(data.description);
      this._myForm.get('jobType').setValue(data.jobType);
    });
  }
  onSubmit() {
    this.employeeService.updateEmployee(this._myForm.value, this.activatedRoute.snapshot.paramMap.get('employee-id'))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['employee']);
      });
  }
}
