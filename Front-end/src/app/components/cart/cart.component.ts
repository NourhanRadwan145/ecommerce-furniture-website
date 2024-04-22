import { ProductsService } from './../../services/products.service';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    UsersService,
    ProductsService
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  userid = 1;
  user: any;
  cart: any;
  showAddressForm: boolean = false;

  selectedCountry: string = 'Egypt';
  selectedState: any;
  countries: string[] = ['Egypt', 'USA'];
  states: { [key: string]: string[] } = {
    'Egypt': ['Cairo', 'Alexandria', 'Luxor'],
    'USA': ['New York', 'California', 'Texas']
  };

  onCountryChange() {
    this.selectedState = null;
  }


  constructor(private userService: UsersService, private productsService: ProductsService) { }
  toggleAddressForm() {
    this.showAddressForm = !this.showAddressForm;
  }
  updateShippingAddress() {

  }
  ngOnInit(): void {
    this.userService.getUserById(this.userid).subscribe(
      {
        next: (data) => {
          this.user = data;
          this.cart = this.user.carts;
          this.cart.forEach((element: any) => {
            this.productsService.getProductById(element.productId).subscribe(
              {
                next: (data) => {
                  element.product = data;
                }
              }
            );
          });
          console.log(this.cart);
        }
      }
    );
  }


}
