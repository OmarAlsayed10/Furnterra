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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { ProductDto } from './dto/product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Express } from 'express';
import { parseNestedQuery } from 'src/common/utils/query.parse';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 15,
    @Query('search') search?: string,
    @Query() query: Record<string, any> = {},
    @Query('sortBy') sortBy?: string,
    @Query("order") order?: "desc" | "asc",
  ) {
    const { page: _, limit: __, search: ___, sortBy: ____, order: _____, ...rawFilters } = query;

    const filters = parseNestedQuery(rawFilters);

    return this.productsService.findAll(
      Number(page),
      Number(limit),
      search || '',
      filters || {},
      sortBy || 'createdAt',
      order || 'desc',
    );
  }

  @Get('categories')
  getCategories() {
    return this.productsService.findCategories();
  }

  @Get("category/:category")
  getByCategory(@Param("category") category: string) {
    return this.productsService.findByCategory(category)
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin', 'owner')
  @Post()
  create(@Body() dto: ProductDto) {
    return this.productsService.createProduct(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin', 'owner')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productsService.updateProduct(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin', 'owner')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return { imageUrl: `./upload/products/${file.filename}` };
  }
}
