import { Component, OnInit } from '@angular/core';

import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  totalPrice = 0;
  constructor(public cartService: CartService) {}

    ngOnInit() {
      this.cartService.items.forEach( item => this.totalPrice += item.price);
    }

}
