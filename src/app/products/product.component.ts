import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product.model';
import { CartService } from '../shared/services/cart.service';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';
import * as fromAppReducer from '../store/app.reducer';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products$: Observable<Product[]>;
  products: Product[];
  selectedCategory: string;
  messageTitle = "No Products found in this category";
  messageDescription = "";
  goToMessage = "Add Product";
  goToLink = "/products/edit-product/new";

  constructor(public productService: ProductService,
    private cartService: CartService,
    public authService: AuthService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.selectedCategory = this.productService.selectedCategory;
    this.products$ = this.productService.getProducts();
    this.products$.subscribe(products => {
      this.products = products;
    })

    this.store.select("productsList").
      subscribe(data => this.products = data.products);
  }

  onProductSelected(productId: string) {
    this.productService.selectedCategory = this.selectedCategory;
    this.router.navigate(["product-detail", productId], { relativeTo: this.activateRoute });
  }

  addProductToCart(product: Product) {
    this.cartService.items.push(product);
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: { message: "Product added to the cart", icon: "check" },
      duration: 500,
    });
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId);
  }

  getProductsCount(): number {
    if (this.selectedCategory === 'All') {
      return this.products.length;
    } else {
      return this.products.
        filter(product => {
          return product.category === this.selectedCategory
        }).length;
    }
  }
}
