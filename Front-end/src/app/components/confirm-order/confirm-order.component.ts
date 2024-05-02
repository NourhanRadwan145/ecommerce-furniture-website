import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.css'
})
export class ConfirmOrderComponent {
  constructor(private router: Router) { }

continueShopping() {
  window.location.href = '/products';
}
}
