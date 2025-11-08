import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { searchQuery } from '../products/searchQuery';
import { paginate } from '../../common/utils/pagination.util';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: Partial<User>) {
    const user = new this.userModel(data);
    return user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async findByGoogleId(id: string) {
    return this.userModel.findOne({ googleId: id });
  }

  async update(id: any, userUpdate: Partial<User>): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, userUpdate, { new: true })
      .exec();
  }

  async findAll(
    page: number = 1,
    limit: number = 15,
    search: string = '',
    filters: Record<string, any> = {},
  ) {
    const filter = {
      ...filters,
      ...searchQuery(search, ['email']),
    };

    const result = await paginate(
      this.userModel,
      page,
      limit,
      filter,
    );

    return {
      items: result.items,
      pagination: {
        totalUsers: result.pagination.allItems,
        page: result.pagination.page,
        limit: result.pagination.limit,
        totalPages: result.pagination.totalPages,
      },
    };
  }
}
