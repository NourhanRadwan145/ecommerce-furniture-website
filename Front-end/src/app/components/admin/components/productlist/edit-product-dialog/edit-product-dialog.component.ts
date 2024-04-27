import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../Services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-product-dialog.component.html',
  styleUrl: './edit-product-dialog.component.css',
  providers: [ProductService],
})
export class EditProductDialogComponent {
  editForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    details: new FormControl(''),
    image: new FormControl(''),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) {
    console.log(data.productFromParent);
    this.product = data.productFromParent;

    // Set default values for form controls based on product data
    this.editForm.patchValue({
      title: this.product.title,
      price: this.product.price,
      details: this.product.details,
      image: this.product.image,
    });
  }

  product = this.data.productFromParent;

  editFormSubmit() {
    this.product = {
      id: this.product.id,
      title: this.editForm.controls['title'].value,
      price: this.editForm.controls['price'].value,
      details: this.editForm.controls['details'].value, // There was a porblem here
      image: this.editForm.controls['image'].value,
    };
    this.productService.updateProduct(this.product).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        // Explicitly specify the type of 'error' as 'any'
        console.log(error);
      }
    );
  }
  show() {
    console.log(this.product);
  }
}
