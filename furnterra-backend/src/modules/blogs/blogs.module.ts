import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blogs.schema';
import { UsersModule } from '../users/users.module';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

@Module({
    imports:[
        MongooseModule.forFeature([{name:Blog.name,schema:BlogSchema}]),
        UsersModule
    ],
    controllers:[BlogsController],
    providers:[BlogsService],
    exports:[BlogsService]
    
})
export class BlogsModule {}
