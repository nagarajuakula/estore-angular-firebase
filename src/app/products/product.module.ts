import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SearchByCategory } from '../shared/pipe/searchByCategory.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductComponent, 
    ProductDetailComponent, 
    EditProductComponent,
    SearchByCategory
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProductRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class ProductsModule { }
