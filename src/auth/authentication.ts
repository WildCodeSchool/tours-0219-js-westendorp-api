import { Document } from 'mongoose';

export interface Authentication extends Document  {
  readonly _id: string;
  readonly user: string;
  readonly password: string;
}