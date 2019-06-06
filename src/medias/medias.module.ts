import { Module } from '@nestjs/common';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { MongooseModule } from '@nestjs/mongoose';
import { mediasSchema } from './medias.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:
  [MongooseModule.forFeature([{ name: 'medias', schema: mediasSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [MediasController],
  providers: [MediasService],
})
export class MediasModule { }
