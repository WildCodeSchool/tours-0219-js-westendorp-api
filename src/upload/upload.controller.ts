import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Get,
  Param,
  Res,
  Render,
  Header,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';


@Controller()

export class UploadController {

  @Post('upload')
  @UseInterceptors(FileInterceptor('upload'))
  uploadFile(@UploadedFiles() file) {
    console.log('yo');
  }

  @Get('upload/browse')
  @Render('index')
  async root() {
    const files = readdirSync(process.env.UPLOAD_PATH);

    const images = files.filter((f) => {
      if (statSync(join(process.env.UPLOAD_PATH, f)).isFile()) {
        const ext = f.split('.').pop();
        return (/(gif|jpe?g|tiff|web|png|)$/i).test(ext);
      }
      return false;
    })
      .map(f => `/images/${f}`);
    console.log(images);
    return {
      images,
      message: 'Hello world!',
    };
  }
}
