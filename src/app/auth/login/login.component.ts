import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
    constructor(public authService: AuthService) { }
  
    ngOnInit(): void { 
      this.loginForm = new FormGroup({
        email : new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      })
    }
  
    login() {
      // console.log(this.loginForm);
      this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value,);
    }
}
