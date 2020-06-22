import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

export class UserDetails {
  firstName: string;
  lastName: string;
  email?: string;
  address: string;
  address2?: string;
  state: string;
  zip: number;
}

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
})
export class BillingDetailsComponent implements OnInit {

  userDetails: UserDetails;
  userDetailsForm: FormGroup;
  stateDetails: FormArray;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userDetails = new UserDetails();

    this.userDetailsForm = new FormGroup(
      { 
        firstName: new FormControl(this.userDetails.firstName, Validators.required),
        lastName: new FormControl(this.userDetails.lastName, Validators.required),
        email: new FormControl(this.userDetails.email, Validators.required),
        address: new FormControl(this.userDetails.address, Validators.required),
        address2: new FormControl(this.userDetails.address2, Validators.required),
        state: new FormControl(this.userDetails.state, Validators.required),
        zip: new FormControl(this.userDetails.zip, Validators.required),
    }
    );
  }

  updateUserDetails() {
    this.router.navigate(['checkout/checkout', { outlets: { checkOutlet: ['result'] } }]);
  }
}
