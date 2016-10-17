import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'json-web-token';
import moment from 'moment';

let JWT_SECRET = process.env.JWT_SECRET;

let userSchema = new mongoose.schema({

});

userSchema.statics.obtainUsers = (cb) => {
  User.find({}).exec()
  .then(dbUsers => cb(null, dbUsers))
  .catch(err => cb(err));
};

userSchema.statics.registerNewUser = (newUser, cb) => {
  User.findOne({ email: newUser.email }).exec()
  .then(dbUser => {
    bcrypt.hash(newUser.password, 12, (err, hash) => {
      if (err) return cb(err);
      newUser.password = hash;
      return User.create(newUser);
    })
  })
  .then()
  .catch(err => cb(err));
}
