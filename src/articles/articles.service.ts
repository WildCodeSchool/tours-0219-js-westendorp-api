import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Articles } from './articles';
import { Model } from 'mongoose';
import { CreateArticleDTO } from './articles.dto.create';
import { UpdateArticleDTO } from './articles.dto.update';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('articles') private readonly articlesModel: Model<Articles>,
  ) {}

  async getAll(): Promise<Articles[]> {
    return await this.articlesModel.find().exec();
  }

  async create(articleDTO: CreateArticleDTO): Promise<Articles> {
    const model: Articles = new this.articlesModel(articleDTO);
    return await model.save();
  }

  async update(id: string, articleDTO: UpdateArticleDTO) {
    const article = await this.articlesModel.findByIdAndUpdate(id, articleDTO, {
      new: true,
    });
    if (!article) {
      throw new HttpException("Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return article;
  }
  async delete(id: string): Promise<Articles> {
    const article = await this.articlesModel.findByIdAndRemove(id);
    if (!article) {
      throw new HttpException("Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return article;
  }

  async getById(id: string): Promise<Articles> {
    const article = await this.articlesModel.findById(id);
    if (!article) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return article;
  }
}
