import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../../../shared/components/user-details/user-details.component';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users-service/users-service.component';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-add-admins',
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './add-admins.component.html',
  styles: ``,
})
export class AddAdminsComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
  ) {}

  searchTerm = '';
  totalPages = 1;
  currentPage = 1;
  users: any;

  ngOnInit(): void {
    this.loadUsers(1);
  }

  loadUsers(page: number) {
    this.usersService.getAll(page, 15, this.searchTerm,{role:"user"}).subscribe((res) => {
      this.users = res.items;
      this.totalPages = res.pagination.totalPages;
      this.currentPage = res.pagination.page;
    });
  }

  openUserModel(userId: string) {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      height: '600px',
      width: '800px',
      data: { id: userId },
    });
  }

  goToPage(page: number) {
    this.loadUsers(page);
  }

  onSearchChange() {
    this.loadUsers(1);
  }
}
