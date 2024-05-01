import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../Services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-product-dialog.component.html',
  styleUrl: './edit-product-dialog.component.css',
  providers: [ProductService],
})
export class EditProductDialogComponent {
  imageFile: File | null = null;
  productUpdated: any;
  editForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    details: new FormControl(''),
    productQuantity: new FormControl(''),
    poductCategory: new FormControl(''),
    image: new FormControl(''),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private dialog: MatDialogRef<any>,
    private router: Router
  ) {
    console.log(data.productFromParent);
    this.product = data.productFromParent;

    // Set default values for form controls based on product data
    this.editForm.patchValue({
      title: this.product.title,
      price: this.product.price,
      details: this.product.details,
      productQuantity: this.product.quantity,
      poductCategory: this.product.category,
    });
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file.name);
      this.imageFile = file;
      console.log(this.imageFile);

      // Handle the file here. You can add it to a FormData object if you're sending it to a server.
    }
  }

  product = this.data.productFromParent;

  editFormSubmit() {
    console.log(this.product);

    this.productUpdated = new FormData();
    this.productUpdated.append('_id', this.product._id);
    this.productUpdated.append('title', this.editForm.value.title);
    this.productUpdated.append('price', this.editForm.value.price);
    this.productUpdated.append('details', this.editForm.value.details);
    this.productUpdated.append('quantity', this.editForm.value.productQuantity);
    this.productUpdated.append('category', this.editForm.value.poductCategory);
    // this.productUpdated.append('reviews', this.product.reviews);
    if (this.imageFile) {
      this.productUpdated.append('image', this.imageFile);
    }
    this.productService.updateProduct(this.productUpdated).subscribe(
      (data) => {
        console.log(data);
        this.dialog.close();
        Swal.fire({
          icon: 'success',
          title: 'Your Product Updated successfully',
        }).then(() => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/admin/product']);
            });
        });
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
