import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { CartService } from '../../../services/cartService/cart.service';
import { AlertsService } from '../../../shared/components/alert/alerts.service';
import { FavoriteService } from '../../../services/favoriteService/favorite.service';
import { Subscription } from 'rxjs';

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  brand?: string;
  category?: string;
  images?: string[];
  inStock?: boolean;
  stock?: number;
  sold?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit,OnDestroy {
  product: Product = {
    name: '',
    description: '',
    price: 0
  };

  selectedImage: string = '';
  quantity: number = 1;
  isInWishlist: boolean = false;
  wishListSub!:Subscription

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService:CartService,
    private alertService:AlertsService,
    private favoriteService:FavoriteService,
    private router:Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getOne(id).subscribe((data: any) => {
        this.product = data;
        this.product.inStock = (this.product.stock??0)> 0
        this.selectedImage = this.product.images?.[0] || '';
        this.wishListSub = this.favoriteService.favoriteItem$.subscribe((items)=>{
          this.isInWishlist = items.some(i=>i.product._id === this.product._id)
          console.log(this.product)
        })
      });
    }
  }

  ngOnDestroy(): void {
    if(this.wishListSub) return this.wishListSub.unsubscribe()
  }


  increaseQuantity() {
    if (this.quantity < (this.product.stock??1)) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.product.inStock) {
      this.cartService.addToCart(this.product,this.quantity)
      this.alertService.show(`Added ${this.quantity}  ${this.product.name} to cart`,'success')
    }
  }

  buyNow() {
    if (this.product.inStock) {
      this.cartService.addToCart(this.product,this.quantity)
      this.router.navigate(['/checkout/address'])
    }
  }

  toggleWishlist() {
    this.favoriteService.toggleFavorite(this.product,this.quantity)
    this.isInWishlist = this.favoriteService.isInWishList(this.product._id)
      const action = this.isInWishlist ? 'Added to' : 'Removed from';
  this.alertService.show(`${action} wishlist: ${this.product.name}`, 'success');
  }

    getDiscountedPrice(): number {
    if (this.product.discount && this.product.discount > 0) {
      return this.product.price - (this.product.price * this.product.discount / 100);
    }
    return this.product.price;
  }
}
