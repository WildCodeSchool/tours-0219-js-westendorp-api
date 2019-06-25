import { Controller, Get, Post, UseInterceptors, UploadedFiles, } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFiles() file) {
    console.log(file);
  }
}
