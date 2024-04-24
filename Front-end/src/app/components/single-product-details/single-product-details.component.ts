import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { SingleProductService } from '../../Services/single-product.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { OneProductComponent } from './one-product/one-product.component';





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
    OneProductComponent
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
  
  constructor( private route: ActivatedRoute, private router:Router, private productService:SingleProductService) 
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
      },
      error:(err)=>{
        console.log("cannot get the product !!");
        // this.router.navigate(['/error']);
      }
    })

    /********** get related products **********/
    this.productService.getAllProducts().subscribe({
      next: (data:any) => {
        console.log("Received data:", data);
        this.relatedProducts = data.filter((product: any) => product.category === this.product.category && product._id !== this.product._id);
        console.log("Filtered related products:", this.relatedProducts);

      },
      error: (err) => {
        console.log('cannot get related products !!', err);
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

  user_id = "6628143fe5f32a1af24b2956";
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
          // window.location.reload();
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
  

}
