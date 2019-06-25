import {
    Body,
    Controller,
    Post,
    UseInterceptors,
    UploadedFiles,
    Get,
    Param,
    Res,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()

  export class UploadController {

  @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    uploadFile(@UploadedFiles() file) {
    console.log(file);
  }

  @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }

}
