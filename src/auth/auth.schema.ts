import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const authSchema = new mongoose.Schema({
  email: String,
  password: String,
});

authSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

authSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};
