import { Injectable } from "@angular/core"
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { AuthService } from "../../auth/auth.service"
import { Router } from "@angular/router"
import { catchError, throwError } from "rxjs"
import { AlertsService } from "../components/alert/alerts.service"
@Injectable()
export class AuthErrorInterceptor
    implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router,
        private alertService: AlertsService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401 && this.authService.isAuth()) {
                    this.alertService.show("Your session has expired, please login again", 'error')
                    this.authService.logout();
                }
                return throwError(() => {
                    err
                })
            })
        )
    }

}
