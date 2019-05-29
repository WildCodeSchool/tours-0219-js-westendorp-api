import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Medias } from './medias';

@Injectable()
export class MediasService {
  constructor (@InjectModel('medias') private readonly mediasModel:Model<Medias>) {}

  async getAll(): Promise<Medias[]> {
    return await this.mediasModel.find().exec();
  }

}
