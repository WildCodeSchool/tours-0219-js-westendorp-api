import { Document } from 'mongoose';

export interface Media extends Document{
  readonly id: String;
  readonly url: String;
  readonly title: String;
  readonly type: String;
}
