import { BadRequestException } from "@nestjs/common"
import { Request } from "express";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer"
import { extname } from 'path';

const MAX_SIZE = 1*1024*1024

export function multerOptions(folder:string){
      const uploadPath = `./upload/${folder}`;
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
  }
    return{

        limits:{files:MAX_SIZE},
        fileFilter:(req:Request,file:Express.Multer.File,cb:any)=>{
            const allowed = /(jpg|jpeg|png|webp)/
            const ext = extname(file.originalname).toLowerCase()
            if(!allowed.test(ext)){
                return cb(new BadRequestException('Only images are allowed'),false)
            }
            cb(null,true)
        },
        storage:diskStorage({
            destination:`./upload/${folder}`,
            filename:(req,file,cb)=>{
                const uniquename = `${Date.now()}-${file.originalname}`
                cb(null,uniquename)
            }
        })
    }
}
