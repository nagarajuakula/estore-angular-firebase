import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, 
        RouterStateSnapshot } from '@angular/router';
        
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';

@Injectable({
    providedIn: 'root'
})
export class ProductReSolverService implements Resolve<Product[]>{

    constructor(private router: Router, 
                private productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.productService.getProducts();
    }

}