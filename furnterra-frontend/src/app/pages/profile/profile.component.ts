import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users-service/users-service.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent implements OnInit {

  users: any
  constructor(private UsersService: UsersService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    if(id){
      this.UsersService.getById(this.users).subscribe((user) => {
        this.users = user
        console.log(this.users)
      })
    }
  }
}
