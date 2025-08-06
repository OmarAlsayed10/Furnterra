import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';

export interface cartItem {
  productId:string;
  quantity:number;
  product:any;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {

  
  private cartMenuSubject = new BehaviorSubject<boolean>(false);
  cartMenu$ = this.cartMenuSubject.asObservable();
  
  private cartItemSubject = new BehaviorSubject<cartItem[]>([])
  cartItem$ = this.cartItemSubject.asObservable()
  
  constructor(private storage:StorageService){
    const items = this.loadCartItems()
    this.cartItemSubject.next(items)
  }
  toggleCartMenu() {
    this.cartMenuSubject.next(!this.cartMenuSubject.value);
  }

  closeCartMenu(){
    this.cartMenuSubject.next(false)
  }

  openCart(){
    return this.cartMenuSubject.value
  }

  addToCart(product:any,quantity:number=1):void{
    const items = [...this.cartItemSubject.value];
    const existingItem = items.findIndex(i=>i.product._id===product._id)

    if(existingItem > -1){
      items[existingItem].quantity += quantity
    }
    else{
      const productId=product._id
      items.push({productId,product,quantity})
    }

    this.cartItemSubject.next(items)
    this.saveCartItem(items)
    
  }

  getAllCart(){
    return this.loadCartItems()
  }

  removeFromCart(productId:string){
    const item = this.cartItemSubject.value.filter(i=>i.product._id !== productId)
    this.cartItemSubject.next(item)
    this.saveCartItem(item)
  }

  increaseQuantity(productId:string):void{
    const item=[...this.cartItemSubject.value]
    const index = item.findIndex(i=>i.product._id === productId)
    if(index >-1){
      item[index].quantity +=1
      this.cartItemSubject.next(item)
      this.saveCartItem(item)
    }
  }

  decreaseQuantity(productId:string):void{
    const item=[...this.cartItemSubject.value]
    const index = item.findIndex(i=>i.product._id=== productId)
    if(index > -1 && item[index].quantity > 1){
      item[index].quantity -=1
      this.cartItemSubject.next(item)
      this.saveCartItem(item)
    }
  }

  clearCart(){
    this.cartItemSubject.next([])
    this.saveCartItem([])
  }

  private saveCartItem(items:cartItem[]):void{
    this.storage.setItem("cartItem",JSON.stringify(items))
  }

  private loadCartItems():cartItem[]{
    const data = this.storage.getItem("cartItem")
    return data ? JSON.parse(data):[]
  }

    getTotal(item:any[]):number{
    const subTotal = item.reduce(
      (sum,i)=>sum + i.product.price * i.quantity,
      0
    )
    return subTotal
  }


  
}
