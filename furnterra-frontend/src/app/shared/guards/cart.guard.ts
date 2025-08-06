import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CartService } from '../../services/cartService/cart.service';
import { AlertsService } from '../components/alert/alerts.service';

@Injectable({
  providedIn: 'root',
})
export class CartGuard implements CanActivate {
  constructor(private cartService: CartService, private router: Router,private alert:AlertsService) {}

  canActivate(): boolean {
    const cart = this.cartService.getAllCart();

    if (!cart || cart.length === 0) {
      this.alert.show('your cart is empty','error')
      this.router.navigate(['/products']);
      return false;
    }

    return true;
  }
}
