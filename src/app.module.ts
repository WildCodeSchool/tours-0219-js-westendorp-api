import { Module, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';
import { MediasModule } from './medias/medias.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

require('dotenv').config();
@Module({
  imports: [MongooseModule.forRoot(
    process.env.DBURI,
    { useNewUrlParser: true },
    ),
    UploadModule,
    ArticlesModule,
    MediasModule,
    AuthModule],
})
export class AppModule {}
