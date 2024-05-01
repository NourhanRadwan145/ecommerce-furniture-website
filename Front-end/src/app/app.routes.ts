import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemComponent } from './components/item/item.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SingleProductDetailsComponent } from './components/single-product-details/single-product-details.component';
import { RegisterComponent } from './components/register/register.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { AuthGuard } from './Guards/auth.guard';
import { AdminGuard } from './Guards/admin.guard';
import { AllProductsGuard } from './Guards/all-products.guard';
import { UsersComponent } from './components/admin/components/users/users.component';
import { ProductlistComponent } from './components/admin/components/productlist/productlist.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'product/:id',
    component: SingleProductDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'admin/users', component: UsersComponent, canActivate: [AdminGuard] },
  {
    path: 'admin/product',
    component: ProductlistComponent,
    canActivate: [AdminGuard],
  },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AllProductsGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent },
  { path: 'confirm', component: ConfirmOrderComponent },
  { path: '**', redirectTo: '/home' },
];
