import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, productDocument } from './products.schema';
import { Model } from 'mongoose';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    
    constructor( @InjectModel(Product.name) private ProductModel:Model<productDocument>){}
    
    createProduct(dto:ProductDto){
        this.ProductModel.create(dto)
    }

    updateProduct(id:string,dto:ProductDto){
        this.ProductModel.findByIdAndUpdate(id,dto,{new:true})
    }

    findAll(){
        this.ProductModel.find()
    }

    deleteProduct(id:string){
        this.ProductModel.findByIdAndDelete(id)
    }

    findOne(id:string){
        this.ProductModel.findById(id)
    }

}
