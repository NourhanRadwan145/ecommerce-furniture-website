import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../Services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
  constructor(
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<any>,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = Object.values(data);
      this.count = this.products.length;
      this.newProductId = String(this.count + 1);
      console.log(this.newProductId);

      this.createForm = new FormGroup({
        id: new FormControl({ value: this.newProductId, disabled: true }),
        title: new FormControl(''),
        price: new FormControl(''),
        details: new FormControl(''),
        image: new FormControl(''),
      });
    });
    this.createForm = new FormGroup({
      id: new FormControl({ value: this.newProductId, disabled: true }),
      title: new FormControl(''),
      price: new FormControl(''),
      details: new FormControl(''),
      image: new FormControl(''),
    });
  }

  sumbitForm() {
    this.product = {
      id: this.createForm.controls['id'].value,
      title: this.createForm.controls['title'].value,
      price: this.createForm.controls['price'].value,
      details: this.createForm.controls['details'].value,
      image: this.createForm.controls['image'].value,
    };
    console.log(this.product); // id is undefunded

    this.productService.createProduct(this.product).subscribe(
      (data) => {
        console.log(data); // id has a random value now
        this.dialog.close();
        this.router.navigate(['/admin/product']);
      },
      (error) => {
        // Explicitly specify the type of 'error' as 'any'
        console.log(error);
      }
    );
  }
}
