import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css',
})
export class ViewUserComponent {
  user: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.user = data.userFromParent;
  }
  // console.log(this.user);
}
