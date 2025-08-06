import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>){}

    async create(data:Partial<User>){
        const user = new this.userModel(data)
        return user.save()
    }

    async findByEmail(email:string){
        return this.userModel.findOne({email})
    }

    async findById(id:string){
        return this.userModel.findById(id)
    }

    async findByGoogleId(id:string){
        return this.userModel.findOne({googleId:id})
    }

    async update(id:string,userUpdate:Partial<User>):Promise<User|null>{
        return this.userModel.findByIdAndUpdate(id,userUpdate,{new:true}).exec()
    }

   
}
