import { Document } from 'mongoose';

export interface Medias extends Document{
  readonly id: String;
  readonly url: String;
  readonly title: String;
  readonly type: String;
}
