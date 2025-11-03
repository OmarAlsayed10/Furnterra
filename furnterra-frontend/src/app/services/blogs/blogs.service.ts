import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { environment } from '../../../environments/environment';
import { blogDto } from './blogDto';

export interface PaginatedBlogs {
  items: blogDto[];
  totalPages: number;
  pagination: {
    totalBlogs: number;
    totalPages:number;
    page: number;
    limit: number;
  };
}


@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private readonly API = `${environment.apiURL}/blogs`;

  constructor(private http: HttpClient) { }

  getAll(
    page: number = 1,
    limit: number = 15,
    search?: string,
    filters?: Record<string, any>) {
    let params: any = { page, limit };
    if (search) params.search = search;
    if (filters) {
      for (const key in filters) {
        params[key] = filters[key];
      }
    }
    return this.http.get<PaginatedBlogs>(`${this.API}`, { params });
  }

  getOne(id: string) {
    return this.http.get(`${this.API}/${id}`);
  }

  deleteOne(id: string) {
    return this.http.delete(`${this.API}/${id}`, {});
  }

  update(id: string, dto: blogDto) {
    return this.http.patch(`${this.API}/${id}`, dto, {});
  }

  add(dto: blogDto) {
    return this.http.post(`${this.API}`, dto, {});
  }
}
