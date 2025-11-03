import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { ProductDto } from './productDto';

export interface PaginatedProducts {
  items: ProductDto[];
  totalPages: number;
  pagination: {
    totalProducts: number;
    totalPages:number;
    page: number;
    limit: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly API = `${environment.apiURL}/products`;

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) { }

  getAll(
    page: number = 1,
    limit: number = 15,
    search?: string,
    filters?: Record<string, any>
  ) {
    let params: any = { page, limit };
    if (search) params.search = search;
    if (filters) {
      for (const key in filters) {
        params[key] = filters[key];
      }
    }
    return this.http.get<PaginatedProducts>(this.API, { params });
  }

  getBestSelling(limit: number = 15) {
    return this.getAll(1, limit, undefined, { sortBy: "sold", order: 'desc' });
  }

  getFeatured(limit: number = 15) {
    return this.getAll(1, limit, undefined, { isFeatured: true });
  }

  getDiscounted(limit: number = 15) {
    return this.getAll(1, limit, undefined, {sortBy:"discount",order:"desc"});
  }

  getOne(id: string) {
    return this.http.get(`${this.API}/${id}`);
  }

  deleteOne(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

  add(dto: ProductDto) {
    return this.http.post(this.API, dto);
  }

  getCategories() {
    return this.http.get<string[]>(
      `${this.API}/categories`
    )
  }

  getByCategory(category: string) {
    return this.http.get<PaginatedProducts>(
      `${this.API}/category/${category}`,
    );
  }

  update(id: string, dto: ProductDto) {
    return this.http.patch(`${this.API}/${id}`, dto);
  }
}
