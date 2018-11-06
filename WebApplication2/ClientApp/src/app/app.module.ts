import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RegisterComponent } from './register/register.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeCreateComponent } from './employee/create/emloyee-create.component';
import { EmployeeUpdateComponent } from './employee/update/emloyee-update.component';
import { KeysPipe } from './employee/job-type/job-type';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationCreateComponent } from './organization/create/organization-create.component';
import { OrganizationUpdateComponent } from './organization/update/organization-update.component';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { NonAuthGuardService as NonAuthGuard } from './auth/non-auth-guard.service';
import { AuthService } from './auth/auth.service';
import { NavMenuService } from './nav-menu-service/nav-menu.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RegisterComponent,
    LoginComponent,
    EmployeeComponent,
    EmployeeCreateComponent,
    EmployeeUpdateComponent,
    OrganizationComponent,
    OrganizationCreateComponent,
    OrganizationUpdateComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'register', component: RegisterComponent, canActivate: [NonAuthGuard]  },
      { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard]  },
      {
        path: 'employee',
        children: [
          { path: '', component: EmployeeComponent, canActivate: [AuthGuard] },
          { path: 'create', component: EmployeeCreateComponent, canActivate: [AuthGuard]  },
          { path: 'update/:employee-id', component: EmployeeUpdateComponent, canActivate: [AuthGuard]  }
        ]
      },
      {
        path: 'organization',
        children: [
          { path: '', component: OrganizationComponent, canActivate: [AuthGuard]  },
          { path: 'create', component: OrganizationCreateComponent, canActivate: [AuthGuard]  },
          { path: 'update/:organization-id', component: OrganizationUpdateComponent, canActivate: [AuthGuard]  }
        ]
      }
    ])
  ],
  providers: [AuthGuard, NonAuthGuard, AuthService, NavMenuService],
  bootstrap: [AppComponent],
  exports: [KeysPipe]
})
export class AppModule { }
