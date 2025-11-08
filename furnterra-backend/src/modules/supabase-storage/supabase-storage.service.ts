import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseStorageService {
  private supabase: SupabaseClient;
  private bucketName = 'uploads';

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get('SUPABASE_URL');
    const supabaseKey = this.configService.get('SUPABASE_KEY');

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const fileName = `${folder}/${Date.now()}-${file.originalname}`;

    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    const { data: publicUrlData } = this.supabase.storage
      .from(this.bucketName)
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const url = new URL(fileUrl);
    const pathParts = url.pathname.split('/');
    const fileName = pathParts.slice(pathParts.indexOf(this.bucketName) + 1).join('/');

    const { error } = await this.supabase.storage
      .from(this.bucketName)
      .remove([fileName]);

    if (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  }

  async listFiles(folder: string): Promise<string[]> {
    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .list(folder);

    if (error) {
      throw new Error(`List failed: ${error.message}`);
    }

    return data.map(file => file.name);
  }
}