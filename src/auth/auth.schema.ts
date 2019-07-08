import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const authSchema = new mongoose.Schema({
  email: String,
  password: String,
});

authSchema.pre('save', (next) => {
  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      this.password = hash;
      next();
    });
  });
});

authSchema.pre('findOneAndUpdate', (next) => {
  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(this._update.password, salt, (err, hash) => {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      this._update.password = hash;
      next();
    });
  });
});

authSchema.methods.validatePassword = function validatePassword(data) {
  return bcrypt.compareSync(data, this.password);
};
