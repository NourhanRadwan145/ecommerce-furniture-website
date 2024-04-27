import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-product-dialog',
  standalone: true,
  imports: [],
  templateUrl: './view-product-dialog.component.html',
  styleUrl: './view-product-dialog.component.css',
})
export class ViewProductDialogComponent {
  image =
    'https://w7.pngwing.com/pngs/249/759/png-transparent-chair-comfort-furniture-commode-comfortable-chairs-angle-furniture-fashion-thumbnail.png';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }
}
