import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogsService } from '../../../services/blogs/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../../../shared/components/alert/alerts.service';
import { ImageUploaderComponent } from '../../../shared/components/image-uploader/image-uploader.component';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  templateUrl: './addblogs.component.html',
  imports: [ReactiveFormsModule, QuillModule, ImageUploaderComponent],
})
export class addBlogComponent implements OnInit {
  blogForm!: FormGroup;
  blogId = '';
  isEdit = false;
  uploadImages: string[] = [];

  editorModules = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  constructor(
    private blogs: BlogsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertsService
  ) {
    this.blogForm = this.fb.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id')!;
    if (this.blogId) {
      this.isEdit = true;
      this.blogs.getOne(this.blogId).subscribe((blog) => {
        this.blogForm.patchValue(blog);
      });
    }
  }

  onImageChanges(url: string[]) {
    this.uploadImages = url;
    this.blogForm.patchValue({ image: this.uploadImages });
  }

  onSubmit() {
    if (this.blogForm.invalid) {
      this.alert.show('please fill out all required fields', 'error');
      this.blogForm.markAllAsTouched();
    }

    if (this.isEdit) {
      this.blogs
        .update(this.blogId, this.blogForm.value)
        .subscribe(() => this.router.navigate(['/dashboard/blogs']));
    } else {
      this.blogs.add(this.blogForm.value).subscribe(() => {
        this.router.navigate(['/dashboard/blogs']);
        this.alert.show('blog added successfully', 'success');
      });
    }
  }
}
