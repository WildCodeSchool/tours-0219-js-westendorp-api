import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';


@Module({
  controllers: [UploadController],
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [UploadService],
})
export class UploadModule {}