import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [AuthComponent, SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:'', children: [
        {
          path: 'signup', component: SignupComponent
        },
        {
           path: 'login', component: LoginComponent
        },
        {
          path: '', redirectTo: 'login', pathMatch: 'full'
        }
      ]}
    ])
  ]
})
export class AuthModule { }
