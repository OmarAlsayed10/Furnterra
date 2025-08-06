import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { cartItem, CartService } from '../../../services/cartService/cart.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../../services/checkout/checkout.service';
import { canFormDeactivate } from '../../../shared/guards/form-deactivate.guard';
import { AlertsService } from '../../../shared/components/alert/alerts.service';

@Component({
  standalone:true,
  selector: 'app-address',
  imports: [RouterModule , CommonModule,ReactiveFormsModule],
  templateUrl: './address.component.html',
  styles: ``
})
export class AddressComponent implements OnInit,canFormDeactivate {

  cartItems:cartItem[]=[]
  form!:FormGroup;

  ngOnInit(): void {
    this.cartService.cartItem$.subscribe((item)=>{
      this.cartItems = item
    })

  }
  total(){
  return this.cartService.getTotal(this.cartItems) 
  }
  
  constructor(private cartService:CartService,private fb:FormBuilder,private router:Router ,private checkoutService:CheckoutService,private alert:AlertsService){
    this.form = this.fb.group({
      fullName:['',Validators.required],
      phone:['',Validators.required],
      city:['',Validators.required],
      zipcode:['',Validators.required],
      country:['',Validators.required],
      street:['',Validators.required],
    })
  }

  canDeactivate():boolean{
    const filled = Object.values(this.form.value).some(value => !!value)
    return filled? confirm('you have unsaved changes , are you sure you want to leave?'):true;
  }

    onSubmit(){
       this.checkoutService.setAddress(this.form.value);
       if(this.form.invalid){
      this.alert.show('please fill the required fields','error')
      this.form.markAllAsTouched()
      return;
    }
    this.router.navigate(['/checkout/payment'])
      console.log(this.checkoutService.getAddress())
    }

    



}
