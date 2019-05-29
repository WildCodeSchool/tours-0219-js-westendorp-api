import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Articles } from './articles';
import { Model } from 'mongoose';

@Injectable()
export class ArticlesService {
  constructor (@InjectModel('articles') private readonly articlesModel:Model<Articles>) {}

  async getAll(): Promise<Articles[]> {
    return await this.articlesModel.find().exec();
  }
}
