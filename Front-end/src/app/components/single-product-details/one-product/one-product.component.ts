import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingleProductService } from '../../../Services/single-product.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CartProductsCountService } from '../../../Services/cart-products-count.service';



@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [
    MatIconModule,
    HttpClientModule,
  ],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent 
{
  @Input() product: any;

  constructor(public dialog: MatDialog) {

  }

  openDialog() 
  {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {
        product: this.product
      }
  });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


@Component({
  selector: 'app-product-alert',
  templateUrl: 'product-alert.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, FormsModule, HttpClientModule],
  providers: [SingleProductService],
  styleUrl: './product-alert.component.css'
})
export class DialogContentExampleDialog {

  product: any;
  quantity: number = 1;
  user_id: any;
  ID: any;
  product_number: number;
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService:SingleProductService,
    private route: ActivatedRoute, 
    private productsCount: CartProductsCountService
  ) {

    this.product = data.product;
    this.ID = this.product._id;
  }

  ngOnInit() {
    console.log(this.product);

    this.productService.getUserToken().subscribe({
      next: (data: any) => {
        this.user_id = data.data._id;
        this.product_number = data.data.carts.length;
      },
      error: (err) => {
        console.log('cannot get user token !!', err);
      }
    });
  }


  /**************** Quantity input ****************/
  incrementQuantity() 
  {
    this.quantity++;
  }

  decrementQuantity() 
  {
    if (this.quantity > 1) 
    {
      this.quantity--;
    }
  }

  onQuantityChange() 
  {
    console.log('Quantity changed to: ', this.quantity);
  }


  /**************** Add to cart ****************/
  addProductToCart() 
  {
    if(this.product.quantity >= this.quantity)
    {
      this.productService.addProductToCart(this.user_id, this.ID, this.quantity)
        .subscribe({
          next: (data:any) => {
            Swal.fire({
              icon: 'success',
              title: 'Product added to cart successfully',
            }).then(() => {
              window.location.reload();
            });

          },
          error: (err) => {
            console.log('Cannot add product to cart:', err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Cannot add product to cart, please try again later.',
            });
          }
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Thers is no enough quantity in the stock!',
      });
    }
  }

  
}
