import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { ProductDto } from './dto/product.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import {diskStorage} from 'multer'
import { extname } from 'path';

const MAX_SIZE = 1 * 1024 * 1024

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin')
  @Post()
  create(@Body() dto: ProductDto) {
    return this.productsService.createProduct(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productsService.updateProduct(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get('category/:category')
  getByCategory(@Param('category') category:string){
    return this.productsService.findByCategory(category)
  }

 @Post('upload')
 @UseInterceptors(FileInterceptor('image',{
  limits:{fileSize:MAX_SIZE},
  fileFilter:(req,file,cb)=>{
    const allowed = /jpeg|png|jpg|webp/
    const ext= extname(file.originalname).toLowerCase()
    if(!allowed.test(ext)){
      return cb(new BadRequestException('Only images are allowed'),false)
    }
    cb(null,true);
  },
  storage:diskStorage({
    destination:'./upload/products',
    filename:(req,file,cb)=>{
      const uniquename = `${Date.now()}-${file.originalname}`;
      cb(null,uniquename)
    }
  })
 }))
 uploadImage(@UploadedFile() file:Express.Multer.File){
  return { imageUrl:`./upload/products/${file.filename}`}
 }
}
