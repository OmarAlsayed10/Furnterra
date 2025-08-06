import { Injectable } from "@angular/core";
import {CanActivate, Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { AlertsService } from "../components/alert/alerts.service";

@Injectable({providedIn:"root"})

export class AdminGuard implements CanActivate{
  constructor(private auth:AuthService,private router:Router,private alert:AlertsService){}

  canActivate():boolean {
    const user = this.auth.getUser()
    if(user?.role==='admin'){
      return true
    }
    else if(user?.role ==='owner'){
      return true
    }
    this.alert.show("you do not have permission for that",'error')
    this.router.navigateByUrl('/')
    
    return false
  }

}