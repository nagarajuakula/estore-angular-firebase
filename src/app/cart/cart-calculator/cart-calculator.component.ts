import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-cart-calculator',
    templateUrl: './cart-calculator.component.html'
})
export class CartCalculator implements OnInit, OnChanges {

    @Input() products: Product[];
    totalValue = 0;
    
    constructor(private router: Router) {}
    
    ngOnChanges(changes: SimpleChanges) {
        const dataChanges: SimpleChange = changes.products;
    
        const products: Product[] = dataChanges.currentValue;
        this.totalValue = 0;
        products.forEach((product) => {
          this.totalValue += product.price;
        });
      }
    
      ngOnInit() {
      }

      goToCheckout(path: string) {
        this.router.navigate([{ outlets: { primary: ['checkout'], products: ['products']}}]);
      }
}