import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Get,
  Param,
  Res,
  Render,
  Header,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { diskStorage } from 'multer'

@Controller()

export class UploadController {

  @Post('upload')
  // @UseInterceptors(FileInterceptor('upload'))
  @UseInterceptors(FileInterceptor('upload', {
    storage: diskStorage({
      destination: process.env.UPLOAD_PATH
      , filename: (req, file, cb) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  uploadFile(@UploadedFile() file, @Req() req) {
    return {
      "uploaded": 1,
      "fileName": file.filename,
      "url": `${req.protocol}://${req.hostname}/images/${file.filename}`,
    }
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
