import { BadRequestException } from "@nestjs/common"
import { Request } from "express";
import { memoryStorage } from "multer" 
import { extname } from 'path';

const MAX_SIZE = 1*1024*1024

export function multerOptions(folder:string){
    
    return{
        limits:{fileSize: MAX_SIZE},
        fileFilter:(req:Request,file:Express.Multer.File,cb:any)=>{
            const allowed = /(jpg|jpeg|png|webp)/
            const ext = extname(file.originalname).toLowerCase()
            if(!allowed.test(ext)){
                return cb(new BadRequestException('Only images are allowed'),false)
            }
            cb(null,true)
        },
        storage: memoryStorage() 
    }
}