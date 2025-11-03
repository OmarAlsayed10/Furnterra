import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface PaginatedUsers {
  items: any[];
  totalPages: number;
  pagination: {
    totalUsers: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly API = `${environment.apiURL}/users`;

  constructor(private http: HttpClient) {}

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
    return this.http.get<PaginatedUsers>(`${this.API}`, { params });
  }

  getById(id: string) {
    return this.http.get(`${this.API}/${id}`);
  }
}
