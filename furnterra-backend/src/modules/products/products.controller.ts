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
import { ProductsService } from './products.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @UseGuards(JwtStrategy, RolesGuard)
  @Role('admin')
  @Post()
  create(@Body() dto: ProductDto) {
    return this.productsService.createProduct(dto);
  }

  @UseGuards(JwtStrategy, RolesGuard)
  @Role('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productsService.updateProduct(id, dto);
  }

  @UseGuards(JwtStrategy, RolesGuard)
  @Role('admin')
  @Delete('id')
  delete(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Get('id')
  getOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
