import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BlogsService } from '../../services/blogs/blogs.service';
import { CommonModule } from '@angular/common';
import { LongDatePipe } from '../../shared/components/pipes/long-date.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blogs',
  imports: [CommonModule,RouterModule,LongDatePipe,FormsModule],
  templateUrl: './blogs.component.html',
  styles: ``
})
export class BlogsComponent implements OnInit {
   constructor(private blogService:BlogsService){}

     searchTerm = '';
   blogs:any[]=[]

   ngOnInit(): void {
     this.blogService.getAll().subscribe((blog:any)=>{
      this.blogs = blog

    })
  }

     filteredProducts() {
    return this.blogs.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
