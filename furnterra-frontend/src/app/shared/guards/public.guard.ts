import {CanActivate,Router} from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AlertsService } from '../components/alert/alerts.service';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})

export class publicGuard implements CanActivate{

  constructor(private auth:AuthService,private router:Router,public alert:AlertsService){}

  canActivate():boolean {
    if(this.auth.isAuth()){
      this.alert.show("you are already Logged in ",'success')
        this.router.navigateByUrl('/')

      return false
    }
    return true;
  }


}
