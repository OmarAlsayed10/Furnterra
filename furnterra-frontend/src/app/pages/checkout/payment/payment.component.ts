import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../services/cartService/cart.service';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../../../services/checkout/checkout.service';
import { canFormDeactivate } from '../../../shared/guards/form-deactivate.guard';

@Component({
  selector: 'app-payment',
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styles: ``
})
export class PaymentComponent implements canFormDeactivate {

    cartItems:any=[]
    form!:FormGroup;

  constructor(private fb:FormBuilder,private cartService:CartService,private router:Router,private checkoutService:CheckoutService){
    this.form = this.fb.group({
      method:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.cartService.cartItem$.subscribe((item)=>{
      this.cartItems = item
    })

  }
  total(){
  return this.cartService.getTotal(this.cartItems) 
  }

  canDeactivate():boolean{
    const filled = Object.values(this.form.value).some(value => !!value)
    return filled? confirm('you have unsaved changes , are you sure you want to leave?'):true;
  }

  



}
