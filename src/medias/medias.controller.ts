import { Controller, Get, Delete, Param, Post,Body} from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasDTO } from './medias.dto';

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

  @Get(':id')
    async readOne(@Param('id') id: string) {
    return await this.mediasService.getById(id);
  }

  @Post()
    async  createMedia(@Body() mediasDTO: MediasDTO) {
    return await this.mediasService.create(mediasDTO);
  }

}
