import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  PaginatedProducts,
  ProductsService,
} from '../../../services/products/products.service';
import { FavoriteService } from '../../../services/favoriteService/favorite.service';
import { AlertsService } from '../alert/alerts.service';
import e from 'express';

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
  selector: 'app-best-selling',
  imports: [CommonModule, RouterModule],
  templateUrl: './best-selling.component.html',
})
export class BestSellingComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private favoriteService: FavoriteService,
    private alertService: AlertsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  bestSelling: Product[] = [];
  chunkSize: number = 4;
  featured: Product[] = [];
  discounted: Product[] = [];


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setChunkSize(event.target.innerWidth);
  }

  setChunkSize(width: number) {
    if (width < 640) {
      this.chunkSize = 1;
    } else if (width < 768) {
      this.chunkSize = 2;
    } else { // md and up
      this.chunkSize = 4;
    }
    this.currentSlide = 0;
  }

  selectedTab: 'featured' | 'bestSeller' | 'discounted' = "featured";

  products: any[] = [];

  product: Product = {
    name: '',
    description: '',
    price: 0,
  };

  page: number = 1;

  totalPages: number = 1;

  quantity: number = 1;

  limit: number = 4;

  isInWishlist: boolean = false;

  currentSlide: number = 0;

  selectTab(tab: 'featured' | 'bestSeller' | 'discounted') {
    this.selectedTab = tab;
    this.page = 1;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setChunkSize(window.innerWidth);
    } else {
      this.setChunkSize(1024);
    }
    this.productService.getBestSelling(15).subscribe(res => this.bestSelling = res.items);
    this.productService.getFeatured(15).subscribe(res => this.featured = res.items);
    this.productService.getDiscounted(15).subscribe(res => this.discounted = res.items);
  }

  getDiscountedPrice(product: Product): number {
    if (!product.discount) return product.price
    return product.price - (product.price * product.discount / 100);

  }


  getCurrentProducts() {
    switch (this.selectedTab) {

      case "featured":
        return this.featured;
      case "bestSeller":
        return this.bestSelling;
      case "discounted":
        return this.discounted;
    }
  }

  getProductChunks() {
    const products = this.getCurrentProducts();
    const chunks: Product[][] = [];
    for (let i = 0; i < products.length; i += this.chunkSize) {
      chunks.push(products.slice(i, i + this.chunkSize));
    }
    return chunks;
  }

  nextSlide() {
    const totalSlides = this.getProductChunks().length;
    if (this.currentSlide < totalSlides - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }

  prevSlide() {
    const totalSlides = this.getProductChunks().length;
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = totalSlides - 1;
    }
  }

  toggleWishlist(product: Product) {
    this.favoriteService.toggleFavorite(product, 1);
    this.isInWishlist = this.favoriteService.isInWishList(product._id);
    const action = this.isInWishlist ? 'Added to' : 'Removed from';
    this.alertService.show(`${action} wishlist: ${product.name}`, 'success');
  }

}
