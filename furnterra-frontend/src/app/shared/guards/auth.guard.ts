import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { AlertsService } from "../components/alert/alerts.service";

@Injectable({ providedIn: "root" })

export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router,private alert : AlertsService) { }

  canActivate(): boolean {
    if (!this.auth.isAuth) {
      this.alert.show('please login first', 'error')
      this.router.navigate(["/login"],
        { queryParams: { returnUrl: this.router.url } }
      )

      return false
    }

    return true;
  }

}