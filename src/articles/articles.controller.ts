import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDTO } from './articles.dto.create';
import { UpdateArticleDTO } from './articles.dto.update';
import { AuthGuard } from '@nestjs/passport';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Get()
  async readAll() {
    return await this.articlesService.getAll();
  }

  @Get('search')
  async sectionArticle(@Query() section: string) {
    return await this.articlesService.getBySection(section);
  }

  @Post()
  @UseGuards(AuthGuard())
  async  createArticle(@Body() articleDTO: CreateArticleDTO) {
    return await this.articlesService.create(articleDTO);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateArticle(@Param('id') id: string, @Body() articleDTO: UpdateArticleDTO) {
    return await this.articlesService.update(id, articleDTO);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async removeArticle(@Param('id') id: string) {
    return await this.articlesService.delete(id);
  }

  @Get(':id')
  async readOne(@Param('id') id: string) {
    return await this.articlesService.getById(id);
  }

}
