import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  isUserDetailsPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isUserDetailsPage = this.router.url.includes('/dashboard/users/');
      }
    });
  }
}
