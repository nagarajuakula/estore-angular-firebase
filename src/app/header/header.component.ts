import { Component, OnChanges } from '@angular/core';

import { CartService } from '../shared/services/cart.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { ProductService } from '../shared/services/product.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(public cartService: CartService,
                public productService: ProductService,
                public authService: AuthService,
                public userService: UserService,
                private router: Router) {}

    logout() {
        this.authService.logout();
    }

    search(searchTerm: InputEvent) {
        this.productService.searchTerm = searchTerm.data; 
    }
}