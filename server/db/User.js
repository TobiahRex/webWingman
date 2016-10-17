import mongoose from 'mongoose';
import Promise from 'bluebird';
import jwt from 'json-web-token';
import moment from 'moment';

const bcrypt = Promise.promisify(require('bcrypt'));

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
  .then((dbUser) => {
    if (dbUser) return cb({ ERROR: 'That user already exists' });
    return bcrypt.hashAsync(newUser.password, 12);
  })
  .then((hash) => {
    newUser.password = hash;
    return User.create(newUser);
  })
  .then(dbUser => cb(null, dbUser))
  .catch(err => cb(err));
};
