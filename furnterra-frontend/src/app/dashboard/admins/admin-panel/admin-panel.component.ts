import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminsService } from '../../../services/admins/admins.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../../../shared/components/user-details/user-details.component';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  imports: [RouterLink, CommonModule, PaginationComponent,FormsModule],
  templateUrl: './admin-panel.component.html',
  styles: ``,
})
export class AdminPanelComponent implements OnInit {

  constructor(private AdminService: AdminsService, private dialog: MatDialog,
  ) { }

  searchTerm = '';
  totalPages = 1;
  currentPage = 1;
  admins: any;

  ngOnInit(): void {
    this.loadUsers(1)
  }


  loadUsers(page: number) {
    this.AdminService.getAll(page, 15, this.searchTerm).subscribe((res) => {
      this.admins = res.items;
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
    this.loadUsers(page)
  }

  onSearchChange() {
    this.loadUsers(1)
  }


}
