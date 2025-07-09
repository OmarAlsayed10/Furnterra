import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './products.schema';
import { Model } from 'mongoose';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    
    constructor( @InjectModel(Product.name) private ProductModel:Model<ProductDocument>){}
    
    async createProduct(dto:ProductDto){
        return await this.ProductModel.create(dto)
    }

    async updateProduct(id:string,dto:ProductDto){
       return await this.ProductModel.findByIdAndUpdate(id,dto,{new:true})
    }

    async findAll(){
       return await this.ProductModel.find()
    }

    async deleteProduct(id:string){
       return await this.ProductModel.findByIdAndDelete(id)
    }

    async findOne(id:string){
        return await this.ProductModel.findById(id)
    }

    async findByCategory(category:string){
        return await this.ProductModel.find({category:category.toLowerCase()})
    }

}
