import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeProductService } from '../../../../Services/home-product.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { SingleProductService } from '../../../../Services/single-product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HttpClientModule,CommonModule,MatIconModule],
  providers:[HomeProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit{
  constructor(private productService: HomeProductService,public dialog: MatDialog){}
  FourProducts:any[]=[];
  ngOnInit(): void {
      this.productService.getFourProducts().subscribe(
        {
          next:(data: any)=>{
            for(let i =0;i<4;i++){
            this.FourProducts.push(data[i]);
              console.log(data[i]);
            }
            // data.forEach((element: any) => {
            //   this.FourProducts.push(element);
            // });
            //console.log(data);
          }
        }
    );
  }
  openDialog(productId: string) {
    this.productService.getProductById(productId).subscribe(product => {
      const dialogRef = this.dialog.open(DialogContentExampleDialog, {
        data: { product }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    });
  }


}



@Component({
  selector: 'app-product-alert',
  templateUrl: '../../../single-product-details/one-product/product-alert.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, FormsModule, HttpClientModule],
  providers: [SingleProductService],
  styleUrl: '../../../single-product-details/one-product/product-alert.component.css'
})
export class DialogContentExampleDialog {

  product: any;
  quantity: number = 1;
  user_id: any;
  ID: any;
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService:SingleProductService,
    private route: ActivatedRoute,
  ) {

    this.product = data.product;
    this.ID = this.product._id;
  }

  ngOnInit() {
    console.log(this.product);

    this.productService.getUserToken().subscribe({
      next: (data: any) => {
        console.log(data);
        this.user_id = data.data._id;
        // console.log(this.user_id);
      },
      error: (err :any) => {
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
    if(this.product.quantity > this.quantity)
    {
      this.productService.addProductToCart(this.user_id, this.ID, this.quantity)
        .subscribe({
          next: (data:any) => {
            console.log(data);
            Swal.fire({
              icon: 'success',
              title: 'Product added to cart successfully',
            }).then(() => {
              window.location.reload();
            });

          },
          error: (err:any) => {
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
