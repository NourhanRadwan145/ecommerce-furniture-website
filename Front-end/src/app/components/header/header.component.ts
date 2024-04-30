import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import { SingleProductService } from '../../Services/single-product.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatBadgeModule
  ],
  providers: [SingleProductService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
matMenu: any;
  data: number = 0;
  oredersTotalPrice: number = 0;
  user_id: any;

  constructor(private productService: SingleProductService) { }

  ngOnInit() {
        this.productService.getUserToken().subscribe({
          next: (data: any) => {
            console.log(data);
            console.log(data.data.orders);
            this.data = data.data.carts.length;
            data.data.orders.forEach((element: { totalPrice: number; }) => {
              console.log(element);
              this.productService.getOrderById(element).subscribe({
                next: (data: any) => {
                  console.log(data.totalPrice);
                  this.oredersTotalPrice += data.totalPrice;
                },
                error: (err) => {
                  console.log('cannot get user token !!', err);
                }
              });
            });
          },
          error: (err) => {
            console.log('cannot get user token !!', err);
          }
        });
  }

}
