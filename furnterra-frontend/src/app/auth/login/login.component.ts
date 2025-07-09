import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import {ReactiveFormsModule,FormBuilder,FormGroup,Validators} from '@angular/forms'
import { AlertsService } from '../../shared/components/alert/alerts.service';

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
      password:["",[Validators.required,Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]]
    })
  }

  onSubmit(){
    if(!this.loginForm.valid) {
       this.loginForm.markAllAsTouched();
       return;
    }

    const {email,password,firstName,lastName} = this.loginForm.value
    this.auth.login({email,password,firstName,lastName}).subscribe({
      next:(res)=>{
        if(!res.access_token){
          this.alert.show("user doesn't exist",'error')
          return;
        }
        this.auth.setToken(res.access_token)
        this.auth.setUser(res.user)
        this.route.navigate(["/"])
      },
      error:(err)=>{
        
          if(err.error.message.includes("Verify OTP")){
            sessionStorage.setItem("emailForOtp",email)
            this.route.navigate(["/verify-otp"])
          }
        else{
        this.alert.show("email or password is wrong !",'error')
      }
    }
    })
  }

  googleSubmit(){
    this.auth.googleLogin()
  }
}
