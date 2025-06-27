import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PendingUser, PendingUserDocument } from './pending-user.schema';
import { Model } from 'mongoose';

@Injectable()
export class PendingUserService {
    constructor(@InjectModel(PendingUser.name) private pendingUserModel:Model<PendingUserDocument>){}

    async create(data:Partial<PendingUser>){

        return this.pendingUserModel.create(data)
    }

    async findByEmail(email:string){
        return this.pendingUserModel.findOne({email})
    }

    async deleteByEmail(email:string){
        return this.pendingUserModel.deleteOne({email})
    }
}


