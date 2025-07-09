import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BlogsService } from '../../blogs/blogs.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LongDatePipe } from '../../shared/components/pipes/long-date.pipe';
import { AlertsService } from '../../shared/components/alert/alerts.service';

@Component({
  selector: 'app-blogs',
  imports: [RouterModule,CommonModule,LongDatePipe,ReactiveFormsModule],
  templateUrl: './blogs.component.html',
  styles: ``
})
export class BlogsComponent implements OnInit {

  allBlogs:any[]=[];
  editForm:FormGroup;
    selectedBlog:any=null;

  constructor(private blogs:BlogsService,private fb:FormBuilder,private router:Router,private alert:AlertsService){
    this.editForm = this.fb.group({
      name:["",Validators.required],
      content:["",Validators.required],
      date:["",Validators.required],
      image:["",Validators.required],
    })
  }

  ngOnInit(): void {
    this.blogs.getAll().subscribe((blog:any)=>{
      this.allBlogs = blog
    })
  }

   openSidebar(blog:any){
    this.selectedBlog = {...blog}


    this.editForm.patchValue({
            name:blog.name,
            content:blog.content,
            image:blog.image

    })
  }

  closeSidebar(){
    this.selectedBlog=null
  }

  updateBlog() {
  if (!this.selectedBlog) return;

  const updatedBlog = {
    ...this.selectedBlog,
    ...this.editForm.value
  };

  this.blogs.update(this.selectedBlog._id, updatedBlog).subscribe({
    next: () => {
      const index = this.allBlogs.findIndex(b => b._id === this.selectedBlog._id);
      if (index !== -1) {
        this.allBlogs[index] = updatedBlog;
      }
      this.alert.show('Blog updated successfully', 'success');
      this.closeSidebar();
    },
    error: () => {
      this.alert.show('Failed to update blog', 'error');
    }
  });
}





}
