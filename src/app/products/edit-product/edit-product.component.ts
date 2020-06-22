import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product;
  imageUrl: any;
  editMode = false;
  imageEvent: string[] = [];
  images = [];

  constructor(public productService: ProductService,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params['id'];
    if(productId && productId !== 'new') {
      this.editMode= true;
      this.product = this.productService.getProductById(productId);
    } else {
      this.product = new Product();
      const category = this.activatedRoute.snapshot.queryParams['category'];
      this.product.category = category;
    }
  }

  addOrEditProduct(productForm: NgForm) {
    if(this.editMode) {
      this.productService.updateProduct(productForm.value);
    } else {
      this.productService.addProduct(productForm.value, this.imageEvent);
    }
  }

  onFileSelected(event: any) {
    this.imageEvent = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.imageUrl = (<FileReader>event.target).result;
        this.product.imageUrl = this.imageUrl;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
