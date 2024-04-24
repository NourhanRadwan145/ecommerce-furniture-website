import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent 
{
  @Input() product: any;

  constructor(public dialog: MatDialog) {}

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
  imports: [MatDialogModule, MatButtonModule, MatIconModule, FormsModule],
  styleUrl: './product-alert.component.css'
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
