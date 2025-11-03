import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogsService } from '../../services/blogs/blogs.service';
import { CommonModule } from '@angular/common';
import { LongDatePipe } from '../../shared/pipes/long-date.pipe';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-blogs',
  imports: [CommonModule, RouterModule, LongDatePipe, FormsModule, PaginationComponent],
  templateUrl: './blogs.component.html',
  styles: ``
})
export class BlogsComponent implements OnInit {
  constructor(private blogService: BlogsService, private route: ActivatedRoute) { }

  searchTerm = '';
  blogs: any[] = []
  totalPages = 1;
  currentPage = 1;

  ngOnInit(): void {
    this.loadBlogs(1)
  }

  loadBlogs(page: number) {
    this.blogService.getAll(page, 9, this.searchTerm).subscribe((res) => {
      this.blogs = res.items
      this.totalPages = res.pagination.totalPages
      this.currentPage = res.pagination.page

    })
  }

  goToPage(page:number){
    this.loadBlogs(page)
  }

  onSearchChange(){
    this.loadBlogs(1)
  }

}
