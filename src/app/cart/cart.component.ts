import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: {}[];

  // Not Found Message
  messageTitle = "Your cart is empty";
  messageDescription = "Get some amazing products and discounts";
  goToMessage = "Start Shopping";
  goToLink = "/products";
  
  constructor(private cartService: CartService) { 
    
  }

  ngOnInit(): void {
    this.cartProducts = this.cartService.items;
  }

  removeCartProduct(index: number) {
    this.cartService.items.splice(index, 1);
    this.cartProducts  = this.cartService.items;
  }

}
