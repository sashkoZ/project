import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../Services/organization.services';

@Component({
  selector: 'organization',
  templateUrl: './organization.component.html',
  providers: [OrganizationService]
})
export class OrganizationComponent implements OnInit {
  constructor(private organizationService: OrganizationService) {
  }
  _organizations: Array<any>;

  ngOnInit() {
    this.setData();
  }
  deleteOrganization(id) {
    this.organizationService.deleteOrganization(id).subscribe((data: any) => {
        console.log(data);
        this.setData();
      });
  }
  setData() {
    this.organizationService.getOrganizations()
      .subscribe((data: any) => {
        console.log(data);
        this._organizations = data;
      });
  }

}


