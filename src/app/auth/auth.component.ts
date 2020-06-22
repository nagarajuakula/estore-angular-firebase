import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private afAuth: AngularFireAuth,
              public authService: AuthService) {}

  authenticate(authForm: NgForm) {
    console.log(authForm);
    this.authService.signUp("", "");
  }
}
