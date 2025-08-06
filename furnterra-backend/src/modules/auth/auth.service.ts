import { BadRequestException, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import * as nodemailer from "nodemailer"
import { PendingUserService } from './pending-user/pending-user.service';

@Injectable()
export class AuthService implements OnModuleInit {

    private transporter;

    constructor (private usersService:UsersService,private jwtService : JwtService,private pendingUser:PendingUserService){
        this.transporter = nodemailer.createTransport({
          host:'smtp.gmail.com',
          port:465,
          secure:true,
          auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD    
          }  
        })
    }



    async onModuleInit() {
        const ownerEmail = "owner@Furntera.com";
        const  ownerExist = await this.usersService.findByEmail(ownerEmail)
        if(!ownerExist){
            const hashPassword = await bcrypt.hash("ownerKi1@",10)
            await this.usersService.create({
                email:ownerEmail,
                firstName:"Owner",
                lastName:"user",
                password:hashPassword,
                isVerified:true,
                provider:'local',
                role:'owner',
                permissions:['*']

            })
        }
        const adminEmail = "admin@Furntera.com";
        const  adminExist = await this.usersService.findByEmail(adminEmail)
        if(!adminExist){
            const hashPassword = await bcrypt.hash("adminKi1@",10)
            await this.usersService.create({
                email:adminEmail,
                firstName:"Admin",
                lastName:"user2",
                password:hashPassword,
                isVerified:true,
                provider:'local',
                role:'admin',
                permissions:['manage-blogs']

            })
        }
        
    }

    private generateOTP(length=6):string{
        const digits="123456"
        let otp =""
        for(let i = 0 ; i < length ; i++){
            otp+=digits[Math.floor(Math.random()*digits.length)];
        }

        return otp

    }



   async register(email:string,password:string,firstName:string,lastName:string){
    const existUser = await this.usersService.findByEmail(email)
    const pendingUser = await this.pendingUser.findByEmail(email)
    console.log('JWT_SECRET from config:', process.env.JWT_SECRET);
    if(existUser || pendingUser){
        throw new UnauthorizedException("User already exists")
    }
    
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password,salt)

    const otp = this.generateOTP()
    const otpExpiresAt=new Date(Date.now() + 5 * 60 * 1000);

        await this.pendingUser.create({
        firstName,
        lastName,
        email,
        otp,
        otpExpiresAt,
        password:hashedPassword
    })

    await this.transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:email,
        subject:"verify your email - OTP code",
        text:`Your OTP code is ${otp}`,
        html:`<p>Your OTP code is : <b>${otp}</b></p>`
    },(err:any)=>{
        if(err){throw new BadRequestException("Email is not valid , please enter a valid email")}});

    return {message:"Registeration Successful , please verify your email with the OTP sent"}

   }
   

   async verifyOTP(email:string,otp:string){

    const user = await this.pendingUser.findByEmail(email)

    if(!user){
        throw new UnauthorizedException("user not found")
    }

    if(user.otp !== otp){
        throw new UnauthorizedException("invalid OTP")
    }

    if(!user.otpExpiresAt || user.otpExpiresAt < new Date()){
        throw new UnauthorizedException("OTP expired")
    }

    await this.usersService.create({
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        password:user.password,
        provider:"local",
        role:"user",
        isVerified:true
    })

    // user.otp = null;
    // user.otpExpiresAt = null;

    // await this.usersService.update(user._id as string,user)

    await this.pendingUser.deleteByEmail(email)
    const createdUser = await this.usersService.findByEmail(email)

    return this.login(createdUser)

   }

   async resendOtp(email:string){

        const user = await this.usersService.findByEmail(email)

        if(!user){
            throw new UnauthorizedException("user not found")
        }

         if(user.isVerified){
            
        return {message:"User already verified"}
    }
    

    const otp = this.generateOTP()

    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000)

    user.otp = otp
    user.otpExpiresAt = otpExpiresAt

    await this.usersService.update(user._id as string , user)

    await this.transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:email,
        subject:"verify your email - OTP code",
        text:`Your OTP code is ${otp}`,
        html:`<p>Your OTP code is : <b>${otp}</b></p>`
    })

    return { message:"OTP resent successfully"}

   }

   async login(user:any){
    const payload = {sub:user._id,email:user.email,role:user.role}
    return{
        access_token:this.jwtService.sign(payload),
        user:{
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            role:user.role
        }
    }

    
   }
   

   async validateUser(email:string,password:string){
    const user = await this.usersService.findByEmail(email)
    if(!user){
        const pendingUser = await this.pendingUser.findByEmail(email)
        if(pendingUser && await (bcrypt.compare(password,pendingUser.password))){
            throw new UnauthorizedException("Account not verified , please Verify OTP")
        }
        
    }
    if(!user||!user.password||!(await bcrypt.compare(password,user.password))){
        throw new UnauthorizedException("email or password is wrong!")
    }

     if (!user.isVerified) {
      throw new UnauthorizedException('Email not verified yet');
    }

    return user;
   }

   async googleLogin(profile:any){
    let user = await this.usersService.findByGoogleId(profile.id)
    if(!user){
        user=await this.usersService.create({
            email:profile.emails[0].value,
            provider:'google',
            googleId:profile.id
        })
    }

    return this.login(user)

   }

   async createAdmin(ownerId:string,
    adminData:{
        email:string;
        password:string;
        firstName:string;
        lastName:string;
        permissions:string[]
    }
   ){
    const owner = await this.usersService.findById(ownerId)
    if(!owner || owner.role !=="owner"){
        throw new UnauthorizedException("Only Owner can create Admins")
    }

    const existing = await this.usersService.findByEmail(adminData.email)
    if(existing){
        throw new BadRequestException("Admin with this email already exist")
    }

    const hashedPassword = await bcrypt.hash(adminData.password,10)

    const newAdmin = await this.usersService.create({
        email:adminData.email,
        password:hashedPassword,
        firstName:adminData.firstName,
        lastName:adminData.lastName,
        role:"admin",
        provider:'local',
        isVerified:true,
        permissions:adminData.permissions
    })

    return {message:"Admin has been created sucessfully",adminId:newAdmin._id}

   }
}

