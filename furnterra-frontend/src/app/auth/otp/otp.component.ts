import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertsService } from '../../shared/components/alert/alerts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './otp.component.html',
})
export class OTPComponent implements AfterViewInit {
  email:string="";
  otpForm!:FormGroup

  @ViewChildren('otpinput')otpInputs!:QueryList<ElementRef>

  controls=["d0","d1","d2","d3","d4","d5"]

  constructor(private router:Router,private fb:FormBuilder,private auth:AuthService,private alerts:AlertsService){
    this.otpForm = this.fb.group({
            d0:["",[Validators.required,Validators.pattern(/^[0-9]$/)]],
            d1:["",[Validators.required,Validators.pattern(/^[0-9]$/)]],
            d2:["",[Validators.required,Validators.pattern(/^[0-9]$/)]],
            d3:["",[Validators.required,Validators.pattern(/^[0-9]$/)]],
            d4:["",[Validators.required,Validators.pattern(/^[0-9]$/)]],
            d5:["",[Validators.required,Validators.pattern(/^[0-9]$/)]],

    })

    this.email = sessionStorage.getItem("emailForOtp")||""

  if (!this.email) {
    this.alerts.show("Email is missing, please enter your email", 'error');
    this.router.navigate(["/register"]);
  }


}

  focusInput(index:number){

    const input = this.otpInputs.get(index)
    if(input){
      input.nativeElement.focus()
    }

  }


  ngAfterViewInit() {
    this.focusInput(0)
  }

  handleInput(event:any,index:number){
    const input = event.target as HTMLInputElement
    const value = input.value

    if(value.length === 1 && index < this.controls.length-1){
      this.focusInput(index+1)
    }
    else if ( event instanceof InputEvent && index > 0 && value === "" && event.inputType === "deleteContentBackward"){
        this.focusInput(index-1)
    }
  }

  verifyOtp(){
    if(this.otpForm.invalid){
      this.alerts.show("please enter the 6 digits OTP",'error')
      return;
    }

      const otp = Object.values(this.otpForm.value).join("")

      this.auth.verifyOtp({email:this.email,otp:otp}).subscribe({
        next:(res:any)=>{
          this.auth.setToken(res.access_token)
          this.auth.setUser(res.user)
          sessionStorage.removeItem("emailForOtp")
          this.alerts.show("OTP verified , redirecting...", 'success')
          setTimeout(async () => {
            this.router.navigate(["/"]) 
          }, 2000);
        },
        error:(err)=>{
                 const errmessage = err?.error?.message
                 console.log(errmessage)

        this.alerts.show(errmessage,'error')
        }
      })
  }

  resendOtp(){

    this.auth.resendOtp(this.email).subscribe({
      next:(res)=>{
        this.alerts.show("OTP has been sent to your email",'success')
      },
      error:(err)=>{
        const errmessage = err?.error?.message

        this.alerts.show(errmessage,'error')
      }
    })

  }

}
