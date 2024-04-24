import { Component, OnInit } from '@angular/core';
import { HomeProductService } from '../../../../services/home-product.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  providers:[HomeProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit{
  constructor(private productService: HomeProductService){}
  FourProducts:any;
  ngOnInit(): void {
    this.productService.getFourProducts().subscribe(
      (data: any)=>{
        this.FourProducts = data;
        console.log(data)
      }
  );
  }

}


