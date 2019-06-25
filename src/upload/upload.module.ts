import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
require('dotenv').config();

@Module({
  controllers: [UploadController],
  imports: [
    MulterModule.register({
      dest: process.env.UPLOAD_PATH,
    }),
  ],
  providers: [UploadService],
})
export class UploadModule {}