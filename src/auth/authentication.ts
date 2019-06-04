import { Document } from 'mongoose';

export interface Authentication extends Document  {
  readonly _id: string;
  readonly email: string;
  readonly password: string;
}
