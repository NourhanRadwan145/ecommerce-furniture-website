import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeProductService } from '../../../../Services/home-product.service';

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

}


