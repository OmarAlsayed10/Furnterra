import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import {ReactiveFormsModule,FormBuilder,FormGroup,Validators} from '@angular/forms'
import { AlertsService } from '../../shared/components/alert/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb:FormBuilder,private auth:AuthService,private route:Router,private alert:AlertsService){
    this.loginForm=this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required]]
    })
  }

  onSubmit(){
    if(!this.loginForm.valid) {
       this.loginForm.markAllAsTouched();
       return;
    }

    const {email,password} = this.loginForm.value;
    
    this.auth.login({email,password}).subscribe({
      next:(res)=>{
        if(!res.access_token){
          this.loginForm.setErrors({invalidCredentials: true});
          return;
        }
        this.auth.setToken(res.access_token);
        this.auth.setUser(res.user);
        this.route.navigate(["/"]);
      },
      error:(err:HttpErrorResponse)=>{
        const errorMessage = err?.error?.message || ""
        if(errorMessage.includes("Verify OTP")){
          sessionStorage.setItem("emailForOtp",email);
          this.route.navigate(["/verify-otp"]);
        }
        else {
          this.loginForm.setErrors({invalidCredentials: true});
        }
      }
    })
  }

  googleSubmit(){
    this.auth.googleLogin()
  }
}