import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cartService/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit, OnDestroy {
  cartMenu = false;
  private sub!: Subscription;
  
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.sub = this.cartService.cartMenu$.subscribe((state) => {
      this.cartMenu = state;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  closeCartMenu(){
    this.cartService.toggleCartMenu()
  }

  removeItem(productId:string){
    this.cartService.removeFromCart(productId)
  }
  
  increase(productId:string){
    this.cartService.increaseQuantity(productId)
  }
  decrease(productId:string){
    this.cartService.decreaseQuantity(productId)
  }

  get cartItem$(){
    return this.cartService.cartItem$
  }

total(item:any[]){
  return this.cartService.getTotal(item)
}
  
}
  