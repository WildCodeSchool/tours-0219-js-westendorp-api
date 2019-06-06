import * as mongoose from 'mongoose';

export const articlesSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String,
  date: Date,
  author: String,
  section: String,
  media: String,
});
