import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavoriteService } from '../../../services/favoriteService/favorite.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cartService/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorite',
  imports: [CommonModule, RouterModule],
  templateUrl: './favorite.component.html',
})
export class FavoriteComponent implements OnInit, OnDestroy {
  favoriteMenu = false;
  private sub!: Subscription;

  constructor(
    private favoriteService: FavoriteService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.sub = this.favoriteService.favoritemenu$.subscribe((state) => {
      this.favoriteMenu = state;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  closeFavoriteMenu() {
    this.favoriteService.closeFavoriteMenu();
  }

  removeItem(productId: string) {
    this.favoriteService.removeFavorite(productId);
  }

  increase(productId: string) {
    this.favoriteService.increaseQuantity(productId);
  }
  decrease(productId: string) {
    this.favoriteService.decreaseQuantity(productId);
  }

  get favoriteItem$() {
    return this.favoriteService.favoriteItem$;
  }

  getTotal(item: any[]): number {
    const subTotal = item.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );
    const shipping = item.length > 0 ? 9.99 : 0;
    return subTotal + shipping;
  }

  clearFavorite() {
    this.favoriteService.clearFavorite();
  }

  moveFavoriteToCart() {
    const favorite = this.favoriteService.getAll();
    favorite.forEach((item) => {
      this.cartService.addToCart(item.product, item.quantity);
    });

    this.favoriteService.clearFavorite();
  }
}
