import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { Role } from "src/common/decorators/role.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { multerOptions } from "src/common/utils/multer.config";

@Controller('upload')
export class UploadController {
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin')

  @Post('products')
  @UseInterceptors(FileInterceptor('image', multerOptions('products')))
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    return { imageUrl: `/upload/products/${file.filename}` };
  }

  @Post('blogs')
  @UseInterceptors(FileInterceptor('image', multerOptions('blogs')))
  uploadBlogImage(@UploadedFile() file: Express.Multer.File) {
    return { imageUrl: `/upload/blogs/${file.filename}` };
  }

  @Post('users')
  @UseInterceptors(FileInterceptor('image', multerOptions('users')))
  uploadUserAvatar(@UploadedFile() file: Express.Multer.File) {
    return { imageUrl: `/upload/users/${file.filename}` };
  }
}
