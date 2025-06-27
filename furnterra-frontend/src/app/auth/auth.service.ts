import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../components/storage/storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = `${environment.apiURL}/auth`
  constructor( private http:HttpClient,private route:Router,private storage:StorageService) {}
  
  
  // private currentUser:{firstName:string,lastName:string,email:string,role:string}|null=null

  private currentUserSubject = new BehaviorSubject<any>(null)
  currentUser$ = this.currentUserSubject.asObservable()

  login(data:{email:string; password:string,firstName:string,lastName:string}){
    return this.http.post<{access_token:string,user:{firstName:string,lastName:string,email:string,role:string}}>(`${this.API}/login`,data);
  }

  setUser(user:any){
    this.currentUserSubject.next(user)
    this.storage.setItem("user",JSON.stringify(user))
  }

  getUser(){
    const stored = this.storage.getItem("user")
    if(stored){
      const parsed = JSON.parse(stored)
      this.currentUserSubject.next(parsed)
    }
    return null
  }

  register(data:{email:string;password:string,firstName:string,lastName:string}){
    return this.http.post<{access_token:string,user:{firstName:string,lastName:string,email:string,role:string}}>(`${this.API}/register`,data)
  }

  verifyOtp(data:{email:string,otp:string}){
    return this.http.post(`${this.API}/verify-otp`,data)
  }

  resendOtp(email:string){
    return this.http.post(`${this.API}/resend-otp`,{email})
  }

  googleLogin(){
    window.location.href=`${this.API}/google`
  }

  setToken(token:string){
    return this.storage.setItem("token",token)
  }

  getToken(){
    return this.storage.getItem("token")
  }

  logout(){
    this.storage.removeItem("token")
    this.storage.removeItem("user")
    this.route.navigate(["/login"])
  }

  isAuth():boolean{
    return !!this.getToken()
  }
}
