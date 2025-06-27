import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { AlertsService } from '../../components/alert/alerts.service';
import { AlertComponent } from "../../components/alert/alert.component";


@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  registerForm!:FormGroup;

  constructor(private auth:AuthService,private router:Router,private fb:FormBuilder,private alert:AlertsService){
     this.registerForm=this.fb.group({
        firstName:["",[Validators.required]],
        lastName:["",[Validators.required]],
        email:["",[Validators.required,Validators.email]],
        password:["",[Validators.required,Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]]
    })
  }
   
  onSubmit(){
    if(!this.registerForm.valid){
      this.registerForm.markAllAsTouched()
      return;
    }

    const {email,password,firstName,lastName} = this.registerForm.value
    this.auth.register({email,password,firstName,lastName}).subscribe({
      next:(res)=>{
        sessionStorage.setItem("emailForOtp",email)
        this.router.navigate(["/verify-otp"])
      },
      error:(err)=>{
        this.alert.show("username already exists",'error')
      }
    })
  }
}
