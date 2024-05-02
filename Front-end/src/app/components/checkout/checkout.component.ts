import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../products/product.service';
import { Product } from '../products//product.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule],
  providers: [UserService,ProductsService], 
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  user: User | null = null;
  cart: any;
  products: Product[] = []; 
  userForm!: FormGroup; 
  formSubmitted = false;

  constructor(private userService: UserService, private productService: ProductsService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['cash', Validators.required]
    });
// Fetch the logged-in user's details
this.productService.getUserByToken().subscribe((response: any) => {
  const userId = response.data._id;

  this.userService.getUserById(userId).subscribe(user => {
    this.user = user;
    this.userForm.patchValue({
      fullName: user.username,
      email: user.email
    });
  });

  this.userService.getCartByUserId(userId).subscribe((cart: any) => {
    console.log(cart); 
    this.cart = cart;
    this.loadProducts(); 
  });
}); 
}

  loadProducts() {
    let totalPrice = 0; 
    let totalQuantity = 0;
    const deliveryCost = 300;
    const totalElement = document.querySelector('.total'); 

    if (totalElement) {
      this.cart.cart.forEach((item: { product: string, quantity: number }) => {
        this.productService.getProductById(item.product).subscribe( {
          next: (product : Product) =>{
          this.products.push(product);
          totalPrice += product.price * item.quantity; 
          totalQuantity += item.quantity; 
        },
        error : (error)=>{
          console.log(error);
        }
      });
    });

      // Update total price and total quantity in the DOM after all products are loaded
      this.productService.getProductById(this.cart.cart[0].product).subscribe(() => {
        const totalItems = this.products.length;
        totalElement.innerHTML = `
          <span style='float:left;'>
            <div class='thin dense'>Total Items</div>
            <div class='thin dense'>Delivery</div>
            TOTAL
          </span>
          <span style='float:right; text-align:right;'>
            <div class='thin dense'>${totalQuantity}</div> <!-- Use totalQuantity instead of totalItems -->
            <div class='thin dense'>$${deliveryCost.toFixed(2)}</div>
            $${(totalPrice + deliveryCost).toFixed(2)}
          </span>
        `;
      });
    }
  }
  
   

// Method to get product by ID
getProductById(productId: string): Product | undefined {
  return this.products.find(product => product._id === productId);
}

navigateToPayment() {
  this.formSubmitted = true;
  if (this.userForm.valid) {
    // Save the user info form data and cart to local storage
    localStorage.setItem('userInfo', JSON.stringify(this.userForm.value));
    console.log(this.userForm.value); 
    localStorage.setItem('cart', JSON.stringify(this.cart));

    // Navigate to payment page
    this.router.navigate(['/payment']);
  }
}

placeOrder() {
  this.formSubmitted = true;
  if (this.userForm.valid) {
      this.productService.getUserByToken().subscribe((response: any) => {
          const userId = response.data._id;
          this.userService.addProductToOrder(userId).subscribe(
              (response) => {
                  window.location.href = '/confirm';
                  this.router.navigate(['/confirm']);
              },
              (error) => {
                  console.error('Failed to place order:', error);
              }
          );
      });
  }
}
}