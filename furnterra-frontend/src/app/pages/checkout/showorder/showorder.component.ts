import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CheckoutService } from '../../../services/checkout/checkout.service';
import { OrderService } from '../../../services/orders/order.service';
import { AlertsService } from '../../../shared/components/alert/alerts.service';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { take } from 'rxjs';
import { CartService } from '../../../services/cartService/cart.service';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-showorder',
  imports: [RouterModule,DatePipe,CommonModule],
  templateUrl: './showorder.component.html',
  styles: ``,
})
export class ShoworderComponent implements OnInit {
  order: any = null;
  deliveryDate: string = '';
  orderId='ORD-'+ new Date().getFullYear() + '-' + Math.floor(Math.random() * 10000)
  today: Date = new Date();
  cartItem:any=[]

  constructor(
    private router: Router,
    private checkoutService: CheckoutService,
    private orderService: OrderService,
    private alert: AlertsService,
    private authService: AuthService,
    private cartService:CartService,
    private storage:StorageService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.pipe(take(1)).subscribe(user=>{
      if(!user){
        this.router.navigate(['/login'])
        return;
      }

      const cartItems=this.cartService.getAllCart()

      this.cartItem = cartItems

      const orderData = {
        ...this.checkoutService.getOrderData(),
        userId:user._id,
        cartItems
      }
      
      this.orderService.createOrder(orderData).subscribe({
        next: (value) => {
          this.order = value;

          this.storage.setItem('lastOrderId',this.order._id)
         
          const expectedDate = new Date();
          
          expectedDate.setDate(this.today.getDate() + 6);
          this.deliveryDate = `${this.today.toDateString()} - ${expectedDate.toDateString()}`;

          this.checkoutService.resetCheckout();
          this.cartService.clearCart()  
        },
        error: (err) => {
          this.alert.show('error while creating new order', 'error');
        },
      });
    })


  }

  total(){
  return this.cartService.getTotal(this.cartItem) 
  }
}
