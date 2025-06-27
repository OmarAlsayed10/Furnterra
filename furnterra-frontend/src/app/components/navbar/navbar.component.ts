import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  navbarMenu=false
  profileMenu=false
  fullName:any
  isAdmin=false

  constructor(public auth:AuthService){}

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
  

  // get fullName():string{
  //   const user = this.auth.getUser()
  //   return user?`${user.firstName} ${user.lastName}`:""
  // }



  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user=>{
      this.fullName = user
    }
    )

    this.auth.currentUser$.subscribe(user=>{
      this.isAdmin = user?.role==="admin"
    })
  }
  
}
