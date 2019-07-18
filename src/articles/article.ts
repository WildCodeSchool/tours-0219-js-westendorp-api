import { Document } from 'mongoose';

export interface Article extends Document{
  readonly id: String;
  readonly title: String;
  readonly content: String;
  readonly date: Date;
  readonly author: String;
  readonly section: String;
  readonly media: String;
  readonly rank: Number;
}
