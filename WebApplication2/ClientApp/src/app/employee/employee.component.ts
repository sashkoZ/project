import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.services';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {
  }
  _employees: Array<any>;
  _jobTypesDisplay = ["FullTime", "PartTime", "Temporary", "Contract", "Internship"];

  ngOnInit() {
    this.setData();
  }
  deleteEmployee(id) {
    this.employeeService.deleteEmployee(id).subscribe((data: any) => {
       console.log(data);
       this.setData();
      });
  }
  setData() {
    this.employeeService.getEmployees()
      .subscribe((data: any) => {
        console.log(data);
        this._employees = data;
      });
  }

}


