import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/common/decorators/role.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { multerOptions } from 'src/common/utils/multer.config';
import { SupabaseStorageService } from '../supabase-storage/supabase-storage.service'; 

@Controller('upload')
export class UploadController {
  constructor(private supabaseStorage: SupabaseStorageService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin', 'owner')
  @Post('products')
  @UseInterceptors(FileInterceptor('image', multerOptions('products')))
  async uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.supabaseStorage.uploadFile(file, 'products');
    return { imageUrl };
  }

  @Post('blogs')
  @UseInterceptors(FileInterceptor('image', multerOptions('blogs')))
  async uploadBlogImage(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.supabaseStorage.uploadFile(file, 'blogs');
    return { imageUrl };
  }

  @Post('users')
  @UseInterceptors(FileInterceptor('image', multerOptions('users')))
  async uploadUserAvatar(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.supabaseStorage.uploadFile(file, 'users');
    return { imageUrl };
  }
}