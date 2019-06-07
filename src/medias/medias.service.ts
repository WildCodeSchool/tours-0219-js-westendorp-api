import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media } from './media';
import { MediasDTO } from './medias.dto';

@Injectable()
export class MediasService {
  constructor (@InjectModel('medias') private readonly mediasModel:Model<Media>) {}

  async getByType(type:string):Promise<Media[]> {
    return await this.mediasModel.find(type).exec();
  }
  async getAll(): Promise<Media[]> {
    return await this.mediasModel.find().exec();
  }

  async delete(id: string): Promise<Media> {
    const media = await this.mediasModel.findByIdAndRemove(id);
    if (!media) {
      throw new HttpException("Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return media;
  }
  async getById(id: string): Promise<Media> {
    const media = await this.mediasModel.findById(id);
    if (!media) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return media;
  }

  async create(mediasDTO: MediasDTO): Promise<Media> {
    const model: Media = new this.mediasModel(mediasDTO);
    return await model.save();
  }
}
