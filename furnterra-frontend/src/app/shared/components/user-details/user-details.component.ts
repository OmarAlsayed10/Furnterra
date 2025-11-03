import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminsService } from '../../../services/admins/admins.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styles: ``,
})
export class UserDetailsComponent implements OnInit {
  users: any;
  constructor(
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    private adminService: AdminsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.adminService.getById(this.data.id).subscribe((user) => {
      this.users = user;
    });
  }
}
