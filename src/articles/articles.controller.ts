import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDTO } from './articles.dto.create';
import { UpdateArticleDTO } from './articles.dto.update';

@Controller('articles')
export class ArticlesController {
  constructor (private readonly articlesService:ArticlesService) {}
  @Get()
  async readAll(){
    return await this.articlesService.getAll();
  }
  @Post()
    async  createArticle(@Body() articleDTO: CreateArticleDTO){
    return await this.articlesService.create(articleDTO);
  }

  @Put(':id')
  async updateArticle(@Param('id') id:string, @Body() articleDTO: UpdateArticleDTO) {
    return await this.articlesService.update(id, articleDTO);
  }

  @Delete(':id')
  async removeArticle(@Param('id') id:string){
    return await this.articlesService.delete(id);
  }
}
