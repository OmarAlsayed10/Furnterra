import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { environment } from '../../../environments/environment';
import { blogDto } from './blogDto';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private readonly API = `${environment.apiURL}/blogs` 

  constructor(private http:HttpClient,private storage:StorageService) {}


  getAll(){
    return this.http.get(`${this.API}`)
  }

  getOne(id:string){
    return this.http.get(`${this.API}/${id}`)
  }

  deleteOne(id:string){
    return this.http.delete(`${this.API}/${id}`,{
      
    })
  }

  update(id:string,dto:blogDto){


    return this.http.patch(`${this.API}/${id}`,dto,{
      
    })
  }

  add(dto:blogDto){
    return this.http.post(`${this.API}`,dto,{
      
    })
  }
}
