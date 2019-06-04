import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { articlesSchema } from './articles.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'articles', schema: articlesSchema }])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
