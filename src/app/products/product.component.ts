import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product.model';
import { CartService } from '../shared/services/cart.service';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';

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
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.selectedCategory = this.productService.selectedCategory;
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
    this.productService.products.subscribe(products => {
      this.products = products;
    });
  }

  onProductSelected(productId: string) {
    this.productService.selectedCategory = this.selectedCategory;
    this.router.navigate(["product-detail", productId], { relativeTo: this.activateRoute });
  }

  addProductToCart(product: Product) {
    this.cartService.items.push(product);
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {message: "Product added to the cart", icon: "check"},
      duration: 500,
    });
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId);
  }

  getProductsCount(): number {
    if (this.selectedCategory === 'All') {
      return this.productService.productsList.length;
    } else {
      return this.productService.productsList.
        filter(product => {
          return product.category === this.selectedCategory
        }).length;
    }
  }
}
