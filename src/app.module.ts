import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';
import { MediasModule } from './medias/medias.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://admin:transformer2019@cluster0-vfkte.azure.mongodb.net/Westendorp?retryWrites=true'),
    ArticlesModule,
    MediasModule,
    AuthModule],
})
export class AppModule {}
