import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { SingleProductService } from '../../Services/single-product.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { OneProductComponent } from './one-product/one-product.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../header/header.component';





@Component({
  selector: 'app-single-product-details',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    FormsModule,
    FieldsetModule,
    HttpClientModule,
    CommonModule,
    MatIconModule,
    RouterModule,
    OneProductComponent,
    MatProgressSpinnerModule,
    HeaderComponent
  ],
  providers: [SingleProductService],
  templateUrl: './single-product-details.component.html',
  styleUrl: './single-product-details.component.css'
})
export class SingleProductDetailsComponent implements OnInit
{
  ID:any;
  product:any;
  quantity: number = 1;
  selectedTab: 'description' | 'reviews' = 'description';
  review: string = '';
  name: any;
  rating: any;
  email: any;
  relatedProducts: any[] = [];
  allProducts: any[] = [];

  currentProductIndex: number = 0;
  isFirstProduct: boolean = false;
  isLastProduct: boolean = false;

  user_id: any;

  product_number: number = 0;
  @Output() productNumberChange: EventEmitter<number> = new EventEmitter<number>();

  constructor( 
    private route: ActivatedRoute, 
    private router:Router, 
    private productService:SingleProductService,
  ) 
  {
    this.ID = route.snapshot.params["id"];
  }
  
  
  ngOnInit(): void
  {

    /******* get single product ********/

    this.productService.getProductById(this.ID).subscribe({
      next:(data)=>{
        // console.log(data)
        if(data == null)
        {
          this.router.navigate(['/']);
        }
        this.product = data;
        // console.log(this.product);
        
      },
      error:(err)=>{
        console.log("cannot get the product !!");
        // this.router.navigate(['/error']);
      }
    })

    /********** get related products **********/
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        console.log("Received data:", data);
        this.allProducts = data;
        if (this.product && this.product.category) {
          this.relatedProducts = data.filter((product: any) => product.category === this.product.category && product._id !== this.product._id);
        }
        console.log("Filtered related products:", this.relatedProducts);
        if (this.relatedProducts.length == 0) {
          for (let i = 0; i < 4; i++) {
            this.relatedProducts.push(data[i]);
          }
        }
    
        /************ for updating current index for product pagination ************/
        let storedIndex = localStorage.getItem('currentProductIndex');
        this.currentProductIndex = storedIndex ? parseInt(storedIndex, 10) : 0;
        this.currentProductIndex = Math.min(Math.max(this.currentProductIndex, 0), this.allProducts.length - 1);
        /**************************************************************************/
      },
      error: (err) => {
        console.log('cannot get related products !!', err);
      }
    });
    
    

    /********** get user token ***********/

    this.productService.getUserToken().subscribe({
      next: (data: any) => {
        console.log(data);
        // console.log(data.data.carts.length);
        this.product_number = data.data.carts.length;
        this.user_id = data.data._id;
        // console.log(this.user_id);
      },
      error: (err) => {
        console.log('cannot get user token !!', err);
      }
    });
  }

  /**************** Quantity input ****************/
  incrementQuantity() 
  {
    this.quantity++;
  }

  decrementQuantity() 
  {
    if (this.quantity > 1) 
    {
      this.quantity--;
    }
  }

  onQuantityChange() 
  {
    console.log('Quantity changed to: ', this.quantity);
  }

  /********************** Desc and Reviews btns **********************/

  showDescription() 
  {
    this.selectedTab = 'description';
  }

  showReviews() 
  {
    this.selectedTab = 'reviews';
  }


  toggleStar(index: number) {

    this.newReview.rating = index;

    let allReviews = this.product.reviews;
    for(let i = 0; i < allReviews.length; i++) {
      if(allReviews[i].user_id === this.user_id) 
      {
        allReviews[i].rating = index;
        return;
      }
    }
  }


  resetStarStates() 
  {
    for (let i = 1; i <= 5; i++) {
      this.isStarFilled(i);
    }
  }
  
  isStarFilled(index: number): boolean {
    return this.newReview.rating >= index;
  }

  newReview = {
    name: '',
    comment: '',
    rating: 0
  };

  /************************* Add review to database *****************/
  addReview() 
  {

    const newReview = {
      user_id: this.user_id,
      name: this.name,
      comment: this.review,
      rating: this.newReview.rating
    };

      // console.log('You already reviewed this product');
      this.productService.addReview(this.ID, newReview).subscribe({
        next: (data) => {
          console.log(data);
          if (!this.product.reviews) {
            this.product.reviews = [];
          }
          const existingReviewIndex = this.product.reviews.findIndex((review: { user_id: string; }) => review.user_id === this.user_id);
          if (existingReviewIndex !== -1) 
          {
            this.product.reviews[existingReviewIndex] = (data as { review: any }).review;
          } else {
            this.product.reviews.push((data as { review: any }).review);
          }

          this.name = '';
          this.review = '';
          this.newReview.rating = 0;
          this.resetStarStates();
        },
        error: (err) => {
          console.log('cannot add review !!', err);
        }
      });
  }


  getStarIcons(rating: number): string[] {
    const starIcons: string[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starIcons.push('star-filled-review');
      } else {
        starIcons.push('star-empty');
      }
    }
    return starIcons;
  }

  navigateToRelatedProduct(productId: string) {
    this.router.navigate(['/product', productId]);
  }


  /****************** paginate to next and prev product ****************/

  navigateToPreviousProduct() 
  {
    if (this.currentProductIndex > 0) 
    {
      this.currentProductIndex--;
      this.updateCurrentProductIndexInStorage();
      window.location.href = '/product/' + this.allProducts[this.currentProductIndex]._id;

    }
    this.checkFirstAndLastProducts();
  }

  navigateToNextProduct() 
  {
    if (this.currentProductIndex < this.allProducts.length - 1) 
    {
      this.currentProductIndex++;
      this.updateCurrentProductIndexInStorage();
      window.location.href = '/product/' + this.allProducts[this.currentProductIndex]._id;
    }
    this.checkFirstAndLastProducts();
  }

  checkFirstAndLastProducts() 
  {
    this.isFirstProduct = this.currentProductIndex === 0;
    this.isLastProduct = this.currentProductIndex === this.allProducts.length - 1;
  }

  updateCurrentProductIndexInStorage() 
  {
    localStorage.setItem('currentProductIndex', String(this.currentProductIndex));
  }
  
  /*********************** Product img movement *************************/
  moveImage(event: MouseEvent) 
  {
    const img = event.target as HTMLImageElement;
    const container = img.parentElement;
    if (container) 
    {
      const containerRect = container.getBoundingClientRect();

      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      const containerAspectRatio = containerWidth / containerHeight;

      const imgAspectRatio = img.width / img.height;
      
      let maxWidth = containerWidth;
      let maxHeight = containerHeight;
      if (imgAspectRatio > containerAspectRatio) {
        maxHeight = containerWidth / imgAspectRatio;
      } else {
        maxWidth = containerHeight * imgAspectRatio;
      }

      img.style.width = `100%`;
      img.style.height = `${maxHeight}px`;
    }
  }

  /*********************** Add product to cart *************************/

  addProductToCart() 
  {
    if(this.product.quantity > this.quantity)
    {
      this.productService.addProductToCart(this.user_id, this.ID, this.quantity)
        .subscribe({
          next: (data:any) => {
            console.log(data);
            Swal.fire({
              icon: 'success',
              title: 'Product added to cart successfully',
            }).then(() => {
              window.location.reload();
            });
            console.log(this.product_number);
          },
          error: (err) => {
            console.log('Cannot add product to cart:', err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Cannot add product to cart, please try again later.',
            });
          }
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Thers is no enough quantity in the stock!',
      });
    }
  }

  /********************************************************************/
  

}
