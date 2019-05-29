import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Medias } from './medias';
import { MediasDTO } from './medias.dto';

@Injectable()
export class MediasService {
  constructor (@InjectModel('medias') private readonly mediasModel:Model<Medias>) {}

  async getAll(): Promise<Medias[]> {
    return await this.mediasModel.find().exec();
  }

  async delete(id: string): Promise<Medias> {
    const media = await this.mediasModel.findByIdAndRemove(id);
    if (!media) {
      throw new HttpException("Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return media;
  }
  async getById(id: string): Promise<Medias> {
    const media = await this.mediasModel.findById(id);
    if (!media) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return media;
  }

  async create(mediasDTO: MediasDTO): Promise<Medias> {
    const model: Medias = new this.mediasModel(mediasDTO);
    return await model.save();
  }
}
