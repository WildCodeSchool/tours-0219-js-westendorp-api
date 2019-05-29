import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Medias } from './medias';

@Injectable()
export class MediasService {
  constructor (@InjectModel('medias') private readonly mediasModel:Model<Medias>) {}

  async getAll(): Promise<Medias[]> {
    return await this.mediasModel.find().exec();
  }

  async getById(id: string): Promise<Medias> {
    const media = await this.mediasModel.findById(id);
    if (!media) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return media;
  }

}
