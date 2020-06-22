import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartCalculator } from './cart-calculator/cart-calculator.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CartComponent, CartCalculator],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    CartRoutingModule
  ]
})
export class CartModule { }
