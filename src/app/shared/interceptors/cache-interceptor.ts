import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { ProductService } from '../services/product.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private cache = new Map();

    constructor(private productService: ProductService) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loadingRequest = "products";
        const requestUrl = request.url;

        const cachedResponse = this.cache.get(loadingRequest);
        //console.log(cachedResponse);
        return cachedResponse ?
            of(cachedResponse) : this.sendRequest(request, next, loadingRequest);
    }

    isCachable(request: HttpRequest<any>): boolean {
        if (request.method === 'GET') {
            return true;
        }
        return false;
    }

    sendRequest(
        req: HttpRequest<any>,
        next: HttpHandler,
        loadingRequest?: string): Observable<HttpEvent<any>> {

        // No headers allowed in npm search request
        const noHeaderReq = req.clone({ headers: new HttpHeaders() });

        return next.handle(noHeaderReq).pipe(
            tap(event => {
                // There may be other events besides the response.
                if (event instanceof HttpResponse && event.body) {
                    //this.productService.isLoading = false;
                    this.cache.set(loadingRequest, event.body); // Update the cache.
                }
            })
        )
    }
}