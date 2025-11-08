import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { SupabaseStorageModule } from '../supabase-storage/supabase-storage.module';

@Module({
  imports:[SupabaseStorageModule],
  controllers: [UploadController],
})
export class UploadModule {}
