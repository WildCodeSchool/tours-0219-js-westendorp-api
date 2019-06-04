import * as mongoose from 'mongoose';

export const authSchema = new mongoose.Schema({
  email: String,
  password: String,
});
