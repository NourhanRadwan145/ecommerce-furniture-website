import { ProductsService } from './../../Services/products.service';
import { CartService } from '../../Services/cart.service';
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
    CartService,
    ProductsService
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  userid = "662b8775a566fe5003f222ee";
  cart: { _id: string, details: string, image: string, quantity: number, price: number }[] = [];
  total: number = 0;
  showAddressForm: boolean = false;
  showCouponForm: boolean = false;
  selectedCountry: string = 'Egypt';
  countries: string[] = ["Algeria", "Bahrain", "Djibouti", "Egypt", "Iraq", "Jordan", "Kuwait", "Lebanon", "Libya", "Mauritania", "Morocco", "Oman", "Palestine", "Qatar", "Saudi Arabia", "Somalia", "Sudan", "Syria", "Tunisia"];

  deletedProduct: { _id: string, details: string, image: string, quantity: number, price: number } | null = null;

  constructor(private userService: CartService, private productsService: ProductsService) { }


  updateTotal() {
    this.total = 0;
    this.cart.forEach(item => {
      this.total += item.price * item.quantity;
    });
  }

  toggleAddressForm() {
    this.showAddressForm = !this.showAddressForm;
  }
  toggleCouponForm() {
    this.showCouponForm = !this.showCouponForm;
  }


  onUpdateCountry() {
    const selectedElement = document.getElementById('country') as HTMLSelectElement;
    this.selectedCountry = selectedElement.value;
    localStorage.setItem('selectedCountry', this.selectedCountry);
  }



  increaseProductQuantity(productid: string) {
    this.userService.increaseProductQuantity(this.userid, productid).subscribe({
      next: (data: any) => {
        const productIndex = this.cart.findIndex(item => item._id === productid);
        if (productIndex !== -1) {
          this.cart[productIndex].quantity++;
          this.updateTotal();
        }
      },
      error: (error: any) => {
        console.error("Failed to increase product quantity", error);
      }
    });
  }

  decreaseProductQuantity(productid: string) {
    this.userService.decreaseProductQuantity(this.userid, productid).subscribe({
      next: (data: any) => {
        const productIndex = this.cart.findIndex(item => item._id === productid);
        if (productIndex !== -1) {
          if (this.cart[productIndex].quantity > 1) {
            this.cart[productIndex].quantity--;
          } else {
            this.deleteProduct(productid);
            return;
          }
          this.updateTotal();

        }
      },
      error: (error: any) => {
        console.error("Failed to decrease product quantity", error);
      }
    });
  }

  deleteProduct(productid: string) {
    this.userService.removeProductFromCart(this.userid, productid).subscribe({
      next: (data: any) => {
        const index = this.cart.findIndex(item => item._id === productid);
        if (index !== -1) {
          this.deletedProduct = this.cart[index];
          this.cart.splice(index, 1);
          this.updateTotal();
        }
        this.ngOnInit();
      },
      error: (error: any) => {
        console.error("Failed to delete product", error);
      }
    });
  }

  ngOnInit() {
    this.cart = [];
    this.selectedCountry = localStorage.getItem('selectedCountry') || 'Egypt';
    this.userService.getUserById(this.userid).subscribe({
      next: (data: any) => {
        data.carts.forEach((item: { product: string; quantity: number }) => {
          const productid = item.product;
          const quantity = item.quantity;
          this.productsService.getProductById(productid).subscribe({
            next: (productData: any) => {
              productData["quantity"] = quantity
              this.cart.push(productData);
              this.updateTotal();
            },
            error: (error: any) => {
              console.log(error);
            }
          });
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
