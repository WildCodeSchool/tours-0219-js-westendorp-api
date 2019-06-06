import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';
import { MediasModule } from './medias/medias.module';
import { AuthModule } from './auth/auth.module';

require('dotenv').config();
@Module({
  imports: [MongooseModule.forRoot(
    process.env.DBURI,
    { useNewUrlParser: true },
    ),
    ArticlesModule,
    MediasModule,
    AuthModule],
})
export class AppModule {}
