import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = null;
  constructor() { }

  createUser(data: any) {
    this.user = new User();
    this.user.email = data.email;
    // this.user.createdOn = data.createdOn;
    this.user.userName = "User Name";
    // this.user.userDetails.firstName = "First Name";
  }
}
