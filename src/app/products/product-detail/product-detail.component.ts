import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  isAddedToCart = false;

  // properties for error page if user directly goes to
  // invalid or unfound product
  messageTitle = "The product you are searching is not available";
  messageDescription = "Go to home page and check other products";
  goToMessage= 'Home';
  goToLink = '/products';

  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const selectedProductId = this.activatedRoute.snapshot.params['id'];
    this.product = this.productService.getProductById(selectedProductId);
  }

  addToCart() {
    //this.cartService.items.pop();
    this.cartService.items.push(this.product);
    this.isAddedToCart = true;
    this.productService.openSnackbar(this.product.title + " added to Cart", "check");
  }

  updateProduct(){
    this.router.navigate(["../../edit-product", this.product.id], {relativeTo: this.activatedRoute});
  }

}
