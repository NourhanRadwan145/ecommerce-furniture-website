import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartProductsCountService {

  private data = new BehaviorSubject<number>(0);
  data$ = this.data.asObservable();
  constructor() { }


  updateData(data: number) {
    this.data.next(data);
    console.log("Data updated:", data);
  }

}
