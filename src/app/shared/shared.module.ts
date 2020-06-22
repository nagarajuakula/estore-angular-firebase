import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NoProductFoundComponent } from './components/no-product-found/no-product-found.component';
import { CacheInterceptor } from './interceptors/cache-interceptor';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@NgModule({
    declarations: [
        NoProductFoundComponent,
        SnackbarComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        NoProductFoundComponent
    ]
//     ,
//   providers: [
//     {
//     provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true
//   }]
})
export class SharedModule {

    
}