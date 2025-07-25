import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth.service";

@Injectable()

export class TokenInterceptor implements HttpInterceptor{

    constructor(private auth:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getToken()
            if(token){
                req=req.clone({
                    setHeaders:{
                        Authorization:`Bearer ${token}`
                    }
                });
            }
    
        return next.handle(req)
    }
}