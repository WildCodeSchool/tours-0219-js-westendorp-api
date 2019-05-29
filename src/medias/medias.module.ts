import { Module } from '@nestjs/common';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { MongooseModule } from '@nestjs/mongoose';
import { mediasSchema } from './medias.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'medias', schema: mediasSchema }])],
  controllers: [MediasController],
  providers: [MediasService],
})
export class MediasModule {}
