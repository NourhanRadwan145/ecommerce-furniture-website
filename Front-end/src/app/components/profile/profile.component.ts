import { Component } from '@angular/core';
import { UserPictureComponent } from './profile components/user-picture/user-picture.component';
import { LinksComponent } from './profile components/links/links.component';
import { PendingOrdersComponent } from './profile components/pending-orders/pending-orders.component';
import { UserInfoComponent } from './profile components/user-info/user-info.component';
import { AcceptedOrdersComponent } from './profile components/accepted-orders/accepted-orders.component';
import { RejectedOrdersComponent } from './profile components/rejected-orders/rejected-orders.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    UserPictureComponent,
    LinksComponent,
    PendingOrdersComponent,
    UserInfoComponent,
    AcceptedOrdersComponent,
    RejectedOrdersComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
