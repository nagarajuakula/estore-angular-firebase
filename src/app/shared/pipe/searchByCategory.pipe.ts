import { PipeTransform, Pipe } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';

import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Pipe({
    name: 'searchByCategory'
})
export class SearchByCategory implements PipeTransform {
    // constructor(private productService: ProductService) {
        
    // }
    transform(products: Product[], category: string): Product[]  {
        if(products === null) {
            return null;
        } else {
            // this.productService.products.subscribe(res => {
        //     products = res;
        //   });
        return category === 'All' ? products : products.filter(product => product.category === category);
        }
    }
}