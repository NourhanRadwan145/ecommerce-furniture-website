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
  imports: [MatDialogModule, MatButtonModule, MatIconModule, FormsModule],
  styleUrl: '../../../single-product-details/one-product/product-alert.component.css'
})
export class DialogContentExampleDialog {

  product: any;
  quantity: number = 1;
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.product = data.product;
  }

  ngOnInit() {
    console.log(this.product);
  }

}


