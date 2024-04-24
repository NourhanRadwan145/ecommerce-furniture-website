import { Component } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';
import { ChairComponent } from './components/chair/chair.component';
import { ModernComponent } from './components/modern/modern.component';
import { ConsComponent } from './components/cons/cons.component';
import { SaleComponent } from './components/sale/sale.component';
import { ProductComponent } from './components/product/product.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports:[
    BannerComponent,
    ChairComponent,
    ModernComponent,
    ConsComponent,
    SaleComponent,
    ProductComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
