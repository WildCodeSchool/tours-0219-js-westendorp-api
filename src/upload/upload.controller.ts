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
  @UseInterceptors(FileInterceptor('upload'))
  uploadFile(@UploadedFiles() file) {
    console.log('yo');
  }

  /*   @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: './uploads' });
    } */

/*   test(@Res() res) {
    res.
  } */
}
