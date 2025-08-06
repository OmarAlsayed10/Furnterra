import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogsService } from '../../../services/blogs/blogs.service';
import { LongDatePipe } from '../../../shared/components/pipes/long-date.pipe';

interface Blog {
createdAt: string|Date;
  _id?: string;
  name: string;
  content?: string;
  image?: string[];
}

@Component({
  selector: 'app-blogsdetails',
  imports: [RouterModule,CommonModule,LongDatePipe],
  templateUrl: './blogsdetails.component.html',
  styles: ``
})
export class BlogsdetailsComponent implements OnInit {

  blog:Blog={
    name:'',
    content:'',
    createdAt:''
  }
  relatedBlogs:Blog[]=[]

  constructor(private blogsService:BlogsService,private route:ActivatedRoute){}


  ngOnInit(): void {
      console.log('Blog images:', this.blog.image);
      this.route.paramMap.subscribe((param)=>{
        const id = param.get("id")
        // const id = this.route.snapshot.paramMap.get('id')
        if(id){
          this.blogsService.getOne(id).subscribe((data:any)=>{
            this.blog=data
          })
          this.blogsService.getAll().subscribe((blogs:any)=>{
            this.relatedBlogs= blogs.filter((b:any)=>b._id!==id).sort(()=>Math.random()-0.5).slice(0,3)
          })
        }
      })

  }

}
