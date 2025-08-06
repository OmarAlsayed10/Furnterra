import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Role } from 'src/common/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { createOrderDto } from './dto/create-order.dto';
import { Request } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createOrder(@Body() orderDto:createOrderDto,@Req() req:Request) {
    const user = req.user as {userId:string}
    return this.orderService.createOrder({
      ...orderDto,
      userId:user.userId

    });

  }

  @Patch(':id/pay')
  async markAsPaid(@Param('id') id: string) {
    return this.orderService.markOrderAsPaid(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin')
  @Get()
  async getOrders() {
    return this.orderService.getAllOrders();
  }
}
