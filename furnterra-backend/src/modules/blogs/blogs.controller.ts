import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Role } from '../../common/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { BlogDto } from './blogs.dto';
import { Permission } from '../../common/decorators/permissions.decorator';
import { AdminPermission } from '../admin/admin.schema';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { parseNestedQuery } from '../../common/utils/query.parse';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) { }

  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
  @Role('admin', 'owner')
  @Permission(AdminPermission.ADD_BLOG)
  @Post()
  create(@Body() dto: BlogDto) {
    return this.blogService.createBlog(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin', 'owner')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: BlogDto) {
    return this.blogService.updateBlog(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
  @Role('admin', 'owner')
  @Permission(AdminPermission.DELETE_BLOG)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogService.deleteBlog(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
  @Role('admin', 'owner')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return { imageUrl: `/upload/blogs/${file.filename}` };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.blogService.getBlog(id);
  }

  @Get()
  getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 3,
    @Query('search') search?: string,
    @Query() query: Record<string, any> = {}
  ) {
    const { page: _, limit: __, search: ___, ...rawFilters } = query;

    const filters = parseNestedQuery(rawFilters);

    return this.blogService.getAllBlogs(
      Number(page),
      Number(limit),
      search || '',
      filters||{}
    );
  }
}
