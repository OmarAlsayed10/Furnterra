import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
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
    return this.http.delete(`${this.API}/${id}`)
  }

 add(dto: ProductDto) {
  return this.http.post(this.API, dto);
}


  update(id:string,dto:ProductDto){
    return this.http.patch(`${this.API}/${id}`,dto)
  }

  getByCategory(category:string){
    return this.http.get(`${this.API}/category/${category}`)
  }
}
