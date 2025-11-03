import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../../services/blogs/blogs.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LongDatePipe } from '../../pipes/long-date.pipe';

@Component({
  selector: 'app-blogs',
  imports: [CommonModule, RouterModule, LongDatePipe],
  templateUrl: './blogs.component.html',
  styles: ``
})
export class BlogsComponent implements OnInit {

  constructor(private blogService: BlogsService, private route: ActivatedRoute) { }

  blogs: any[] = []
  relatedBlog: any[] = []

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = param.get("id")
      if (id) {
        this.blogService.getOne(id).subscribe((data: any) => {
          this.blogs = data
        })
      }

      this.blogService.getAll(1, 4).subscribe((res: any) => {
        const blogArray = res.items
        this.relatedBlog = blogArray.filter((b: any) => b._id !== id).sort(() => Math.random() - 0.5).slice(0, 3)
      })
    })

  }


}
