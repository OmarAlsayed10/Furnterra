import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from '../../shared/components/alert/alerts.service';
import { BlogsService } from '../../services/blogs/blogs.service';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";


@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, PaginationComponent, FormsModule],
  templateUrl: './blogs.component.html',
})
export class BlogsComponent implements OnInit {


  //   editorModules = {
  //   toolbar: [
  //     [{'size':['small',false,'large','huge']}],
  //     ['bold', 'italic', 'underline'],
  //     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  //     ['link', 'image'],
  //     ['clean']
  //   ]
  // };

  allBlogs: any[] = [];
  editForm: FormGroup;
  selectedBlog: any = null;

  totalPages = 1;
  currentPage = 1;
  searchTerm = "";

  constructor(private blogs: BlogsService, private fb: FormBuilder, private alert: AlertsService) {
    this.editForm = this.fb.group({
      name: ["", Validators.required],
      content: ["", Validators.required],
      images: ["", Validators.required],
    })
  }


  ngOnInit(): void {
    this.loadBlogs(1)
  }

  loadBlogs(page: number) {
    this.blogs.getAll(page, 8, this.searchTerm).subscribe((res) => {
      this.allBlogs = res.items
      this.totalPages = res.pagination.totalPages;
      this.currentPage = res.pagination.page;

    })
  }

  openSidebar(blog: any) {
    this.selectedBlog = { ...blog }


    this.editForm.patchValue({
      name: blog.name,
      content: blog.content,
      images: blog.images

    })
  }

  closeSidebar() {
    this.selectedBlog = null
  }

  updateBlog() {
    if (!this.selectedBlog) return;

    const updatedBlog = {
      ...this.selectedBlog,
      ...this.editForm.value
    };

    const index = this.allBlogs.findIndex(b => b._id === this.selectedBlog._id);
    if (index !== -1) {
      this.allBlogs[index] = updatedBlog;
    }
    this.alert.show('Blog updated successfully', 'success');
    this.closeSidebar();
  }
  deleteBlog(blogId: string) {
    this.blogs.deleteOne(blogId).subscribe({
      next: () => {
        this.allBlogs = this.allBlogs.filter(p => p._id !== blogId)
        this.alert.show('Blog has been deleted Successfully', 'success')
      },
    })
  }

  goToPage(page: number) {
    this.loadBlogs(page)
  }

  onSearchChange() {
    this.loadBlogs(1)
  }
};






