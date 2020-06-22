import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email : new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confirmPwd: new FormControl("", [Validators.required, confirmPwdValidator]),
    })
  }

  signUp() {
    // console.log(this.signUpForm);
    this.authService.signUp(this.signUpForm.controls.email.value, this.signUpForm.controls.password.value);
  }

}

export function confirmPwdValidator(control: AbstractControl): {[key: string]: any} {
  // console.log(control.value);
     return 
     this.signUpForm.controls.password !== control.value ? { 'matchPassword': { value: control.value}}: null;
}
