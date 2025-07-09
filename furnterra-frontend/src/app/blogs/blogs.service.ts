import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../shared/storage/storage.service';
import { environment } from '../../environments/environment';
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
    const token = this.storage.getItem("token")
    return this.http.delete(`${this.API}/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }

  update(id:string,dto:blogDto){

    const token = this.storage.getItem("token")

    return this.http.patch(`${this.API}/${id}`,dto,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }

  add(dto:blogDto){
    const token = this.storage.getItem("token")
    return this.http.post(`${this.API}`,dto,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }
}
