import { Component, AfterViewInit, OnInit } from '@angular/core';
import { UserService } from '../checkout/user.service';
import { ProductsService } from '../products/product.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers: [UserService,ProductsService], 
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, AfterViewInit {

  constructor(private userService: UserService, 
    private productService: ProductsService,
    private router: Router, 
    private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    const cardNumberInput = document.getElementById('card-number') as HTMLInputElement;
    const cardHolderInput = document.getElementById('card-holder') as HTMLInputElement;
    const cardExpiryInput = document.getElementById('card-expiry') as HTMLInputElement;
    const cardCvcInput = document.getElementById('card-cvc') as HTMLInputElement;
    const payButton = document.querySelector('.pay-btn') as HTMLButtonElement;

    cardNumberInput.addEventListener('input', function(event) {
      let cardNumber = this.value.replace(/\D/g, '');
      cardNumber = cardNumber.replace(/(.{4})/g, '$1 ').trim();
      this.value = cardNumber;
    });

    cardExpiryInput.addEventListener('input', function(event) {
      let expiryDate = this.value.replace(/\D/g, '');
      expiryDate = expiryDate.replace(/(\d{2})(\d{2})/, '$1/$2').trim();

      if (expiryDate.length > 5) {
        this.value = expiryDate.slice(0, 5);
      } else {
        this.value = expiryDate;
      }
    });

    cardCvcInput.addEventListener('input', function(event) {
      let cvc = this.value.replace(/\D/g, '');

      if (cvc.length > 3) {
        this.value = cvc.slice(0, 3);
      } else {
        this.value = cvc;
      }
    });

    function isValidCardNumber(cardNumber: string) {
      cardNumber = cardNumber.replace(/\s/g, '');
      const visaMastercardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
      return visaMastercardRegex.test(cardNumber);
    }

    function isValidCardHolder(cardHolder: string) {
      const cardHolderRegex = /^[a-zA-Z ]+$/;
      return cardHolderRegex.test(cardHolder);
    }

    function isValidExpiryDate(expiryDate: string) {
      const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
      if (!expiryDateRegex.test(expiryDate)) {
        return false;
      }
    
      const [month, year] = expiryDate.split('/');
      const currentYear = new Date().getFullYear().toString().substr(-2);
      const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
    
      return year >= currentYear && (year !== currentYear || month >= currentMonth);
    }
    
    function isValidCvc(cvc: string) {
      const cvcRegex = /^[0-9]{3}$/;
      return cvcRegex.test(cvc);
    }

    payButton.addEventListener('click', (event) => {
      event.preventDefault();

      const cardNumber = cardNumberInput.value.trim();
      const cardHolder = cardHolderInput.value.trim();
      const expiryDate = cardExpiryInput.value.trim();
      const cvc = cardCvcInput.value.trim();

      if (!isValidCardNumber(cardNumber)) {
        this.snackBar.open('Invalid card number. Please enter a valid card number.', 'Close', { duration: 3000 });
        return;
      }

      if (!isValidCardHolder(cardHolder)) {
        this.snackBar.open('Invalid card holder name. Please enter a valid name.', 'Close', { duration: 3000 });
        return;
      }

      if (!isValidExpiryDate(expiryDate)) {
        this.snackBar.open('Invalid expiry date. Please enter a valid expiry date.', 'Close', { duration: 3000 });
        return;
      }

      if (!isValidCvc(cvc)) {
        this.snackBar.open('Invalid CVC. Please enter a valid CVC.', 'Close', { duration: 3000 });
        return;
      }

      this.snackBar.open('Payment successful!', 'Close', { duration: 3000 });
    });
  }
  ngOnInit(): void {
  }

  placeOrder() {
    this.productService.getUserByToken().subscribe((response: any) => {
        const userId = response.data._id;
        this.userService.addProductToOrder(userId).subscribe(
            (response) => {
                console.log('Order placed successfully', response);
                // Clear cart and user info from local storage
                localStorage.removeItem('cart');
                localStorage.removeItem('userInfo');
                // Navigate to confirmation page or home page
                this.router.navigate(['/confirm']);
            },
            (error) => {
                console.error('Failed to place order:', error);
            }
        );
    });
}
}