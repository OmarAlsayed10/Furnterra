import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../../../products/products.service';

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
export class ProductDetailsComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    price: 0
  };

  selectedImage: string = '';
  quantity: number = 1;
  isInWishlist: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getOne(id).subscribe((data: any) => {
        this.product = data;
        this.selectedImage = this.product.images?.[0] || '';
      });
    }
  }

  // getDiscountedPrice(): number {
  //   if (this.product.discount && this.product.discount > 0) {
  //     return this.product.price * (1 - this.product.discount / 100);
  //   }
  //   return this.product.price;
  // }

  increaseQuantity() {
    if (this.quantity < (this.product.stock || 999)) {
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
      alert(`Added ${this.quantity} ${this.product.name} to cart!`);
    }
  }

  buyNow() {
    if (this.product.inStock) {
      alert(`Proceeding to checkout with ${this.quantity} ${this.product.name}`);
    }
  }

  toggleWishlist() {
    this.isInWishlist = !this.isInWishlist;
  }
}
