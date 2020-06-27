import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, finalize, concatMap } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { of, Observable, Subject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import { Product } from '../models/product.model';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import * as fromAppReducer from '../../store/app.reducer';
import * as productActions from '../../products/store/product.action';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  categories = ["Books", "Electronics", "Groceries", "Houses"];
  firebaseUrl_PREFIX = 'https://angular-microservices-estore.firebaseio.com/products';
  SLASH = '/';
  SUFFIX = '.json';
  isLoading = false;
  productsList: Product[] = [];
  selectedCategory = 'All';
  products = new Subject<Product[]>();
  downloadUrl: Observable<string>;
  searchTerm;

  constructor(private http: HttpClient,
              private router: Router,
              private sanitizer: DomSanitizer,
              private storage: AngularFireStorage,
              private _snackBar: MatSnackBar,
              private store: Store<fromAppReducer.AppState>) { }

  sanitizeUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  getProducts(): Observable<Product[]> {
    this.store.select("productsList").
      subscribe(data => this.productsList = data.products);
    
    if (this.productsList.length !== 0) {
      return of(this.productsList);
    }
    
    this.isLoading = true;

     return this.http.get<Product[]>(this.firebaseUrl_PREFIX + this.SUFFIX).
      pipe(map(response => {
        this.isLoading = false;
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            // this.productsList.push({ ...response[key], id: key });
            this.store.dispatch(new productActions.AddProduct({ ...response[key], id: key }));
          }
        }
        return this.productsList;
      }));
  }

  getProductById(id: String) {
    return this.productsList.find(product => {
      return product.id === id;
    });
  }

  addProduct(product: Product, images: any) {
    const addProductUrl = this.firebaseUrl_PREFIX + this.SUFFIX;
    
    const imagePath = `ProductImages/${product.title}`;
    const imageRef = this.storage.ref(imagePath);
    const task = this.storage.upload(imagePath, images);

    // getting image url from firebase storage and inserting it in firebase
    // database
    task.snapshotChanges().
        pipe(
          finalize(() => {
            this.downloadUrl = imageRef.getDownloadURL();
            this.downloadUrl.pipe(concatMap(url=> {
              product.imageUrl = url;
              return this.http.post(addProductUrl, product,{ reportProgress: true}).
              pipe(map(res =>
                {
                  this.isLoading = true;
                  product.id = res['name'];
                  //this.productsList.push(product);
                  // this.products.next(this.productsList);
                  this.store.dispatch(new productActions.AddProduct(product));
                  this.openSnackbar("Product added Successfully", "check");
              }));
            })).subscribe(
              val => this.isLoading = false,
            );
          })
        ).subscribe( );
    this.router.navigate(["/products"]);
  }

  updateProduct(product: Product) {
    this.isLoading = true;
    const updateProductUrl = this.firebaseUrl_PREFIX + this.SLASH + product.id + this.SUFFIX;
    this.http.put(updateProductUrl, product).subscribe(
      result => {
        this.isLoading = false;
        //this.productsList.push(product);
        //this.products.next(this.productsList);
        this.store.dispatch(new productActions.UpdateProdut(product));
        this.router.navigate(["/products"]);
        this.openSnackbar("Product updated Successfully", "check");
      }
    );
  }

  deleteProduct(key: string) {
    const deleteProductUrl = this.firebaseUrl_PREFIX + this.SLASH + key + this.SUFFIX;
    this.http.delete(deleteProductUrl).subscribe(response => {
      const product = this.productsList.find(product => {
        return product.id == key;
      });
      this.deleteImageFromStorage(product.title);
      //this.products.next(this.productsList);
      this.store.dispatch(new productActions.DeleteProduct(key));
      this.router.navigate(["/products"]);
      this.openSnackbar("Product deleted Successfully", "check");
    });
  }

  deleteImageFromStorage(title: string) {
    const imagePath = `ProductImages/${title}`;
    const imageRef = this.storage.ref(imagePath);
    imageRef.delete().subscribe(
      result => console.log(result),
      error => console.log(error));
  }
  
  openSnackbar(message: string, icon: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {message: message, icon: icon},
      duration: 500,
    });
  }
}