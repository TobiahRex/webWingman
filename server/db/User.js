/* global User*/
import mongoose from 'mongoose';
import Promise from 'bluebird';
// import jwt from 'json-web-token';
// import moment from 'moment';
import bcryptJS from 'bcrypt';

const bcrypt = Promise.promisify(bcryptJS);
// const JWT_SECRET = process.env.JWT_SECRET;
const userSchema = new mongoose.Schema({

});

userSchema.statics.obtainUsers = function (cb) {
  this.find({}).exec()
  .then(dbUsers => cb(null, dbUsers))
  .catch(err => cb(err));
};

userSchema.statics.registerNewUser = function (newUser, cb) {
  this.findOne({ email: newUser.email }).exec()
  .then((dbUser) => {
    if (dbUser) return cb({ ERROR: 'That user already exists' });
    return bcrypt.hashAsync(newUser.password, 12);
  })
  .then((hash) => {
    newUser.password = hash;
    return this.create(newUser);
  })
  .then(dbUser => cb(null, dbUser))
  .catch(err => cb(err));
};

const User = mongoose.model('User', userSchema);
export default User;
