import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { articlesSchema } from './articles.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:
  [MongooseModule.forFeature([{ name: 'articles', schema: articlesSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule { }
