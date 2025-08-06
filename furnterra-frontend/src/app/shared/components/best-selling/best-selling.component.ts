import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { FavoriteService } from '../../../services/favoriteService/favorite.service';
import { AlertsService } from '../alert/alerts.service';

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
  imports: [CommonModule,RouterModule],
  templateUrl: './best-selling.component.html',
})
export class BestSellingComponent implements OnInit {

  constructor(private productService:ProductsService,private favoriteService:FavoriteService , private alertService:AlertsService){}

  selectedTab:'All' | 'Featured' | 'Best Seller' | "Sells" ='All'

  products:any[]=[]

  product:Product={
    name:'',
    description:'',
    price:0
  }

  quantity:number=1

  isInWishlist: boolean = false;


  selectTab(tab:'All' | 'Featured' | 'Best Seller' | "Sells"){
    this.selectedTab = tab
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe((data)=>{
      this.products=data
    })
  }

   toggleWishlist() {
    this.favoriteService.toggleFavorite(this.products,this.quantity)
    this.isInWishlist = this.favoriteService.isInWishList(this.product._id)
      const action = this.isInWishlist ? 'Added to' : 'Removed from';
  this.alertService.show(`${action} wishlist: ${this.product.name}`, 'success');
  }

}
