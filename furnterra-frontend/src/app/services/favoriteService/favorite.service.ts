import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';

interface favoriteMenu{
  quantity:number
  product:any;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  
  private favoriteSubject = new BehaviorSubject<boolean>(false)
  favoritemenu$ = this.favoriteSubject.asObservable()
  
  private favoriteItemSubject = new BehaviorSubject<favoriteMenu[]>([])
  favoriteItem$ = this.favoriteItemSubject.asObservable()

  constructor(private storage:StorageService){
    const items = this.loadFavorite()
    this.favoriteItemSubject.next(items)
  }
  
  toggleFavoriteMenu(){
    this.favoriteSubject.next(!this.favoriteSubject.value)
  }

  closeFavoriteMenu(){
    this.favoriteSubject.next(false)
  }

  favoriteOpen(){
    return this.favoriteSubject.value
  }

  addFavorite(product:any,quantity:number=1){
    const item = [...this.favoriteItemSubject.value]
    const exist = item.findIndex(i=>i.product._id === product._id)
    if(exist > -1){
      item[exist].quantity+=quantity
    }
    else{
      item.push({product,quantity})
    }

    this.favoriteItemSubject.next(item)
    this.saveFavorite(item)
  }

  removeFavorite(productId:string){
    const item = this.favoriteItemSubject.value.filter(i=>i.product._id !== productId)
    this.favoriteItemSubject.next(item)
    this.saveFavorite(item)
  }

  clearFavorite(){
    this.favoriteItemSubject.next([])
    this.saveFavorite([])
  }

  increaseQuantity(productId:string){
    const item = [...this.favoriteItemSubject.value]
    const exist = item.findIndex(i=>i.product._id === productId)
    if(exist > -1){
      item[exist].quantity +=1
      this.favoriteItemSubject.next(item)
      this.saveFavorite(item)
    }
  }
  decreaseQuantity(productId:string){
    const item = [...this.favoriteItemSubject.value]
    const exist = item.findIndex(i=>i.product._id === productId)
    if(exist > -1){
      item[exist].quantity -=1
      this.favoriteItemSubject.next(item)
      this.saveFavorite(item)
    }
  }

  toggleFavorite(product:any,quantity=1){
    const exist = this.isInWishList(product._id)
    if(exist){
      this.removeFavorite(product._id)
    }
    else{
      this.addFavorite(product,quantity)
    }

  }

  isInWishList(productId:any):boolean{
    return this.favoriteItemSubject.value.some(i=>i.product._id === productId)
  }

  private saveFavorite(item:favoriteMenu[]){
    this.storage.setItem('favoriteItem',JSON.stringify(item))
  }

  private loadFavorite():favoriteMenu[]{
    const data = this.storage.getItem('favoriteItem')
    return data?JSON.parse(data) : []
  }

    getAll():favoriteMenu[]{
    return this.favoriteItemSubject.value
  }

}
