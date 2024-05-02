import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../Services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-product-dialog.component.html',
  styleUrl: './create-product-dialog.component.css',
  providers: [ProductService],
})
export class CreateProductDialogComponent implements OnInit {
  product: any;
  count: number = 0;
  products: any;
  newProductId: any;
  createForm: any;
  imageFile: File | null = null;
  constructor(
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<any>,
    private router: Router
  ) {
    this.createForm = new FormGroup({
      title: new FormControl(''),
      price: new FormControl(''),
      details: new FormControl(''),
      productQuantity: new FormControl(''),
      productCategory: new FormControl(''),
    });
  }

  ngOnInit() {}
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageFile = file;
      // Handle the file here. You can add it to a FormData object if you're sending it to a server.
    }
  }
  sumbitForm() {
    this.product = new FormData();
    this.product.append('title', this.createForm.value.title);
    this.product.append('price', this.createForm.value.price);
    this.product.append('details', this.createForm.value.details);
    this.product.append(
      'productQuantity',
      this.createForm.value.productQuantity
    );
    this.product.append(
      'productCategory',
      this.createForm.value.productCategory
    );
    this.product.append('image', this.imageFile);

    this.productService.createProduct(this.product).subscribe(
      (data) => {
        console.log(data); // id has a random value now
        this.dialog.close();
        Swal.fire({
          icon: 'success',
          title: 'Your Prodcut Created successfully',
        }).then(() => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/admin/prodcut']);
            });
        });
      },
      (error) => {
        // Explicitly specify the type of 'error' as 'any'
        console.log(error);
      }
    );
  }
}
