import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admins',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './admins.component.html',
  styles: ``,
})
export class AdminsComponent {}
