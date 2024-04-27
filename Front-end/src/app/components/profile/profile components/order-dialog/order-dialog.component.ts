import { Component, OnInit, Inject } from '@angular/core';
import { HomeProductService } from '../../../../services/home-product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, forkJoin } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [HomeProductService],
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {
  products: any[] = [];  // To store multiple products

  constructor(
    private productService: HomeProductService,
    @Inject(MAT_DIALOG_DATA) public dialogData: { order: any }
  ) {}

  ngOnInit(): void {
    const productIds = this.dialogData.order.products;  // Assuming it's an array of IDs
    console.log(productIds);
    if (productIds && productIds.length) {
      this.fetchProducts(productIds);
    }
  }

  private fetchProducts(productIds: string[]){
    const observables = productIds.map(id => this.productService.getProductById(id));
    forkJoin(observables).subscribe({
      next: (product) => {
        this.products = product;  // Array of product details
        console.log(this.products);
      },
      error: (error) => console.error('Error fetching products', error)
    });
  }
}
