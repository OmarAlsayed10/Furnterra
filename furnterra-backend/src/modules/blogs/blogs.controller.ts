import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Role } from 'src/common/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { BlogDto } from './blogs.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin')
  @Post()
  create(@Body() dto: BlogDto) {
    return this.blogService.createBlog(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: BlogDto) {
    return this.blogService.updateBlog(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogService.deleteBlog(id);
  }

  @Get('id')
  getOne(@Param('id') id: string) {
    return this.blogService.getBlog(id);
  }

  @Get()
  getAll() {
    return this.blogService.getAllBlogs();
  }
}
