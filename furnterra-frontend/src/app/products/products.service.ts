import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../shared/storage/storage.service';
import { Router } from '@angular/router';
import { ProductDto } from './productDto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly API = `${environment.apiURL}/products`

  constructor(private http:HttpClient,private storage:StorageService,private router:Router) {}

  getAll(){
    return this.http.get<any[]>(this.API)
  }

  getOne(id:string){
    return this.http.get(`${this.API}/${id}`)
  }

  deleteOne(id:string){
    const token = this.storage.getItem('token')
    return this.http.delete(`${this.API}/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }

 add(dto: ProductDto) {
  const token = this.storage.getItem('token');
  return this.http.post(this.API, dto, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
}


  update(id:string,dto:ProductDto){
    const token = this.storage.getItem('token')
    return this.http.patch(`${this.API}/${id}`,dto,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }

  getByCategory(category:string){
    return this.http.get(`${this.API}/category/${category}`)
  }
}
