import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({providedIn:"root"})

export class AuthGuard implements CanActivate{
  constructor(private auth:AuthService,private router:Router){}

  canActivate():boolean {
    if(!this.auth.isAuth){
      this.router.navigate(["/login"],
        {queryParams:{returnUrl:this.router.url}}
      )

      return false
    }
    
    return true;
  }

}