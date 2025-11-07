import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './products.schema';
import { Model } from 'mongoose';
import { ProductDto } from './dto/product.dto';
import { searchQuery } from './searchQuery';
import { paginate } from 'src/common/utils/pagination.util';
import { transformImages } from 'src/common/utils/imageUpload.util';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
  ) { }

  async createProduct(dto: ProductDto) {
    return await this.ProductModel.create(dto);
  }

  async updateProduct(id: string, dto: ProductDto) {
    return await this.ProductModel.findByIdAndUpdate(id, dto, { new: true });
  }


  async findAll(
    page: number = 1,
    limit: number = 15,
    search: string = '',
    filters: Record<string, any> = {},
    sortBy: string = "createdAt",
    order: "desc" | "asc" = "desc"
  ) {

    const filter = {
      ...filters,
      ...searchQuery(search, ['name', 'description', 'brand'])
    }

    const sortObj: Record<string, any> = {};
    sortObj[sortBy] = order === "desc" ? -1 : 1

    for (const [key, value] of Object.entries(filters)) {
      if (typeof value === 'object' && (value.min || value.max)) {
        filter[key] = {};
        if (value.min !== undefined) filter[key].$gte = Number(value.min);
        if (value.max !== undefined) filter[key].$lte = Number(value.max);
      } else {
        filter[key] = value;
      }
    }

    const result = await paginate(this.ProductModel, page, limit, filter, sortObj);

    if (result.items && result.items.length) {
      transformImages(result.items)
    }

    return {
      items: result.items,
      pagination: {
        allItems: result.pagination.allItems,
        page: result.pagination.page,
        limit: result.pagination.limit,
        totalPages: result.pagination.totalPages
      }
    }
  }

  async findCategories(): Promise<string[]> {
    return await this.ProductModel.distinct("category");

  }

  async findByCategory(category: string) {
    const result = await paginate(this.ProductModel, 1, 15, { category })
    if (result.items && result.items?.length) {
      result.items = transformImages(result.items)
    }
    return {
      items: result.items,
      pagination: {
        allItems: result.pagination.allItems,
        page: result.pagination.page,
        limit: result.pagination.limit,
        totalPages: result.pagination.totalPages
      }
    }
  }

  async deleteProduct(id: string) {
    return await this.ProductModel.findByIdAndDelete(id);
  }

  async findOne(id: string) {
    const product = await this.ProductModel.findById(id)
    if (product && product.images) {
      return transformImages(product)
    }
    return product
  }
}



