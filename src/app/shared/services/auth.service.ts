import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { UserDetails } from '../../shared/models/user.model';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    loginMessage = "hello";
    user: Observable<User>;
    userDetails: User = null;
    isUserLoggedIn = false;

    constructor(private afAuth: AngularFireAuth,
        private router: Router,
        private aRoute: ActivatedRoute,
        private userService: UserService) {
        this.user = this.afAuth.authState;
        this.user.subscribe(
            (user) => {
                if (user) {
                    this.userDetails = user;
                }
                else {
                    this.userDetails = null;
                }
            }
        );
    }

    signUp(email: string, password: string) {
        this.afAuth.createUserWithEmailAndPassword(email, password)
            .then(value => {
                console.log("success", value);
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("error code: ", errorCode);
                console.log("error Message: ", errorMessage);
            });
    }

    login(email: string, password: string) {
        this.afAuth.signInWithEmailAndPassword(email, password)
            .then(value => {
                //  console.log("Its worked");
                this.isUserLoggedIn = true;
                this.userDetails = value.user;
                this.userService.createUser(this.userDetails);
                const returnUrl = this.aRoute.snapshot.queryParamMap.get("returnUrl");
                this.router.navigate([returnUrl || "/products"]);
            }).catch(err => {
                console.log("Error ", err.message); //There is no user record corresponding to this identifier. The user may have been deleted.
                console.log("Errorcode ", err.code); //auth/user-not-found
            });
    }

    isLoggedIn() {
        if (this.userDetails == null) {
            return false;
        } else {
            return true;
        }
    }

    logout() {
        this.afAuth.signOut()
            .then((res) => {
                this.userDetails = null;
                this.isUserLoggedIn = false;
                this.router.navigate(['/']);
            });
    }

    authenticate() {
        this.loginMessage = "Trying to login....";
        of(true).pipe(delay(2000),
            tap(data => {
                //this.isLoggedIn = true;
            })).subscribe(
                () => {
                    this.loginMessage = null;
                    this.router.navigate(["/books"]);
                }
            );
    }
}