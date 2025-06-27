import { Module } from '@nestjs/common';
import { PendingUserService } from './pending-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PendingUser, PendingUserSchema } from './pending-user.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:PendingUser.name,schema:PendingUserSchema}])],
  providers: [PendingUserService],
  exports:[PendingUserService]
})
export class PendingUserModule {}
