import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CartComponent } from "../cart/cart.component";
import { FavoriteComponent } from "../favorite/favorite.component";
import { CartService } from '../../../services/cartService/cart.service';
import { FavoriteService } from '../../../services/favoriteService/favorite.service';


@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [RouterModule, FormsModule, CartComponent, FavoriteComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  navbarMenu=false
  profileMenu=false
  fullName:any
  isAdmin=false
  authReady=false
  products:any[]=[]
  searchForm=''

  constructor(public auth:AuthService, private cartService:CartService,private favoriteService:FavoriteService,private router:Router){}

  toggleNavbarMenu(){
    this.navbarMenu = !this.navbarMenu
    if(this.navbarMenu){
      this.profileMenu=false
    }
  }
  toggleProfileMenu(){
    this.profileMenu = !this.profileMenu
    if(this.profileMenu){
      this.navbarMenu=false
      this.cartService.closeCartMenu()
      this.favoriteService.closeFavoriteMenu()
    }
  }

  toggleCartMenu(){
    this.cartService.toggleCartMenu()
    if(this.cartService.openCart()){
      this.favoriteService.closeFavoriteMenu()
    }
  }

  toggleFavoriteMenu(){
    this.favoriteService.toggleFavoriteMenu()
    if(this.favoriteService.favoriteOpen()){
      this.cartService.closeCartMenu()
    }
  }

  @HostListener('document:click',['$event'])
  onClickOutside(event:Event){
    const target = event.target as HTMLElement
    if(!target.closest('.relative')&& !target.closest('.fixed')){
      this.navbarMenu=false
      this.profileMenu=false
    }
  }  
  

  filterProducts(){
    return this.products.filter(p=>{
      p.name.toLowerCase().includes(this.searchForm.toLowerCase())
    })
  }

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user=>{
      this.fullName = user
      this.isAdmin = user?.role==="admin" || user?.role ==="owner"
    }
    )

    this.router.events.subscribe(event=>{
      if(event instanceof NavigationStart){
        this.navbarMenu = false
        this.profileMenu = false
        this.cartService.closeCartMenu()
        this.favoriteService.closeFavoriteMenu()
      }
    })


  }
  
}
