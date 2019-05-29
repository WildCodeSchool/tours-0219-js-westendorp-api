import { Controller, Get, Delete, Param } from '@nestjs/common';
import { MediasService } from './medias.service';

@Controller('medias')
export class MediasController {
  constructor (private readonly mediasService:MediasService) {}

  @Get()
  async readAll() {
    return await this.mediasService.getAll();
  }

  @Delete(':id')
  async removeMedia(@Param('id') id:string) {
    return await this.mediasService.delete(id);
  }
}
