import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blogs.schema';
import { Model } from 'mongoose';
import { BlogDto } from './blogs.dto';

@Injectable()
export class BlogsService {

    constructor(@InjectModel(Blog.name) private blogModel:Model<BlogDocument>){}

    async createBlog(dto:BlogDto){
        return await this.blogModel.create(dto)
    }

    async getBlog(id:string){
        return await this.blogModel.findById(id)
    }

    async getAllBlogs(){
        return await this.blogModel.find()
    }

    async updateBlog(id:string,dto:BlogDto){
        return await this.blogModel.findByIdAndUpdate(id,dto,{new:true})
    }

    async deleteBlog(id:string){
        return await this.blogModel.findByIdAndDelete(id)
    }
    
}
