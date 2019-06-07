import * as mongoose from 'mongoose';

export const mediasSchema = new mongoose.Schema({
  id: String,
  url: String,
  title: String,
  type: String,
});
