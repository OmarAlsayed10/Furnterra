import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  private readonly API = `${environment.apiURL}/auth`;
  constructor(private http: HttpClient) { }

  getAll(page: number = 1,
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
    return this.http.get<any>(`${this.API}/admins`, { params });
  }

  getById(id: string) {
    return this.http.get(`${this.API}/${id}`);
  }

  Promote(
    ownerEmail: string,
    userEmail: string,
    action: 'promote' | 'update-permissions' | 'demote',
    permissions: string[] = []
  ) {
    const body = { ownerEmail, userEmail, action, permissions };
    return this.http.post(`${this.API}/admin-user`, body);
  }
}
