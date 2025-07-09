import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { StorageService } from '../../shared/storage/storage.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent implements OnInit {
 constructor(private storage:StorageService, private Sanitizer:DomSanitizer,private router:Router,public auth:AuthService){}

    mainIcons: { name: string; route: string; svg: SafeHtml }[] = [];
    settingsIcons: { name: string; route: string; svg: SafeHtml }[] = [];


activeIndex: { section: 'main' | 'settings'; index: number } = { section: 'main', index: 0 };
  
  ngOnInit(): void {
    this.mainIcons=[
      {
        name:"Home",
        route:"dashboard/home",
        svg:this.Sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000"
                stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M10 12h4v4h-4z" />
              </svg>`
        )
      },
      {
        name:"Admins",
        route:"dashboard/admins",
        svg:this.Sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000"
                stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
              </svg>`
        )
      },
      {
        name:"Products",
        route:"dashboard/products",
        svg:this.Sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000"
                stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 21l18 0" />
                <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                <path d="M5 21l0 -10.15" />
                <path d="M19 21l0 -10.15" />
                <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
              </svg>`
        )
      },
      {
        name:"Blogs",
        route:"dashboard/blogs",
        svg:this.Sanitizer.bypassSecurityTrustHtml(`  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000"
                stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                <path d="M9 7l6 0" />
                <path d="M9 11l6 0" />
                <path d="M9 15l4 0" />
              </svg>`
        )
      },     
    ]

    this.settingsIcons=[
     {
        name:"Settings",
        route:"dashboard/settings",
        svg:this.Sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000"
                stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              </svg>`
        )
      },  
    ]
    const storedIndex = this.storage.getItem("activeIcon")
    if(storedIndex){
      this.activeIndex = JSON.parse(storedIndex)
    }

    this.activeIconRoute(this.router.url)
    this.router.events.pipe(
      filter(event=>event instanceof NavigationEnd)).subscribe((event:NavigationEnd)=>{
          this.activeIconRoute(event.urlAfterRedirects)
      })


  }

  activeIconRoute(url:string){
    const mainMatch = this.mainIcons.findIndex(icon=>`/dashboard/${icon.route.split('/').pop()}`===url)
    const settingsMatch = this.settingsIcons.findIndex(icon=>`/dashboard/${icon.route.split('/').pop()}`===url)
    if(mainMatch !== -1){
      this.activeIndex={section:'main',index:mainMatch}
    }
    else{
      this.activeIndex = {section:'settings',index:settingsMatch}
    }
  }
  
  iconActive(section:'main'|'settings',index:number){
    this.activeIndex = {section,index}
    const route = section==='main'?this.mainIcons[index].route : this.settingsIcons[index].route
    this.storage.setItem("activeIcon",JSON.stringify(this.activeIndex))

    this.router.navigateByUrl('/'+route)      
  }

  logoutAdmin(){
         this.auth.logout()
        this.storage.removeItem('activeIcon')
  }

}
