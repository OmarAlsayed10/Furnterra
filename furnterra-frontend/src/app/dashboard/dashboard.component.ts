import { Component } from '@angular/core';
import {RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  constructor(private auth:AuthService){}
  
  

}
