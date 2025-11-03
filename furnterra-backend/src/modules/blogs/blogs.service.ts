import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blogs.schema';
import { Model } from 'mongoose';
import { BlogDto } from './blogs.dto';
import { searchQuery } from '../products/searchQuery';
import { paginate } from 'src/common/utils/pagination.util';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) { }

  async createBlog(dto: BlogDto) {
    return await this.blogModel.create(dto);
  }

  async getBlog(id: string) {
    return await this.blogModel.findById(id);
  }


  async getAllBlogs(
    page: number = 1,
    limit: number = 15,
    search: string = '',
    filters: Record<string, any> = {}
  ) {

    const filter = {
      ...filters,
      ...searchQuery(search, ["name", "content"])
    }

    const result = await paginate(this.blogModel, page, limit, filter);

    return {
      items: result.items,
      pagination: {
        totalBlogs:result.pagination.allItems,
        page:result.pagination.page,
        limit:result.pagination.limit,
        totalPages:result.pagination.totalPages
      }
    }

  }

  async updateBlog(id: string, dto: BlogDto) {
    return await this.blogModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteBlog(id: string) {
    return await this.blogModel.findByIdAndDelete(id);
  }
}
