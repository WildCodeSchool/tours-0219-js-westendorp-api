import { Document } from 'mongoose';

export interface Authentication extends Document  {
  readonly email: string;
  readonly password: string;
}
