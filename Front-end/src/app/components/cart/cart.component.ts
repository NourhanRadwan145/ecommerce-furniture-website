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

  userid = "662904f2d0e3a39fc2a29adb";
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


  constructor(private userService: UsersService) { }
  toggleAddressForm() {
    this.showAddressForm = !this.showAddressForm;
  }
  updateShippingAddress() {

  }
  ngOnInit(): void {
    this.userService
    this.userService.getUserById(this.userid).subscribe(
      {
        next: (data: any) => {
          // this.cart = data.carts;
          console.log(data);
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    );
  }


}
