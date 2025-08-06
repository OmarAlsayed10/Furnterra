import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AlertComponent } from "./shared/components/alert/alert.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, FooterComponent, CommonModule, AlertComponent],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'furnterra';

  showLayout = true;

  constructor(private auth:AuthService,private router:Router){
    this.router.events.pipe(
      filter(event=> event instanceof NavigationEnd)
    ).subscribe((event:NavigationEnd)=>{
      this.showLayout = !event.urlAfterRedirects.startsWith('/dashboard')
    })
  }

  ngOnInit(): void {
    this.auth.getUser()
  }

  

}
