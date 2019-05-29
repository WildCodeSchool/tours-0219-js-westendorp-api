import { Controller, Get } from '@nestjs/common';
import { MediasService } from './medias.service';

@Controller('medias')
export class MediasController {
  constructor (private readonly mediasService:MediasService) {}
  @Get()
  async readAll() {
    return await this.mediasService.getAll();
  }
}
