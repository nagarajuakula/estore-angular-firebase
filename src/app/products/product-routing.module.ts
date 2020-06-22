import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductReSolverService } from './services/product-resolver-service';


const routes: Routes = [
  {
    path: "",  
    resolve: { product: ProductReSolverService },
    children: [
      { 
        path: 'product-detail/:id', component: ProductDetailComponent 
      },
      { 
        path: 'edit-product/:id', component: EditProductComponent
      },
      { 
        path: 'no-product', component: EditProductComponent
      },
      {
        path: "", pathMatch: "full", component: ProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
