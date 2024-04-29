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

  constructor(private productService: SingleProductService) { }

  ngOnInit() {
    this.productService.getUserToken().subscribe({
      next: (data: any) => {
        console.log(data);
        this.data = data.data.carts.length;
      },
      error: (err) => {
        console.log('cannot get user token !!', err);
      }
    });
  }

}
