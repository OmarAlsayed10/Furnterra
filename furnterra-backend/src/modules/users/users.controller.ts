import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/common/decorators/role.decorator';
import { parseNestedQuery } from 'src/common/utils/query.parse';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Role('owner', 'admin')
  @Get()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 15,
    @Query('search') search?: string,
    @Query() query: Record<string, any> = {},
  ) {
    const { page: _, limit: __, search: ___, ...rawFilters } = query;

    const filters = parseNestedQuery(rawFilters);

    return this.usersService.findAll(
      Number(page),
      Number(limit),
      search || '',
      filters || {},
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Role('owner', 'admin')
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
