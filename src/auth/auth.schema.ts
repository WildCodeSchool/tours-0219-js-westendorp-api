import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const authSchema = new mongoose.Schema({
  email: String,
  password: String,
});

authSchema.pre('save', function(next) {
  let user = this
  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

authSchema.pre('findOneAndUpdate', function(next) {
  let user = this
  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user._update.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user._update.password = hash;
      next();
    });
  });
});

authSchema.methods.validatePassword = function validatePassword(data) {
  return bcrypt.compareSync(data, this.password);
};
