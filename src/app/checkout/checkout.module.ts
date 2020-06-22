import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsComponent } from './products/products.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { CheckoutRoutingModule } from './checkout.routing.module';
import { CheckoutComponent } from './checkout.component';
import { CheckoutNavbarComponent } from './checkout-navbar/checkout-navbar.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { ResultComponent } from './result/result.component';

@NgModule({
    declarations: [
        CheckoutComponent,
        CheckoutNavbarComponent,
        ProductsComponent,
        ShippingDetailsComponent,
        BillingDetailsComponent,
        ResultComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CheckoutRoutingModule
    ]
})
export class CheckoutModule {}