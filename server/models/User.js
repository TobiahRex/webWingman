/* global clearance*/
import mongoose from 'mongoose';
import Promise from 'bluebird';
import npmJWT from 'json-web-token';
import moment from 'moment';
import bcryptJS from 'bcrypt';
import Email from './utility/EmailPromise';

const BCRYPT = Promise.promisify(bcryptJS);
const JWT = Promise.promisify(npmJWT);

const JWT_SECRET = process.env.JWT_SECRET;
const HOSTED_URL = process.env.HOSTED_URL;

const userSchema = new mongoose.Schema({

});

userSchema.statics.obtainUsers = function (cb) {
  this.find({}).exec()
  .then(dbUsers => cb(null, dbUsers))
  .catch(err => cb(err));
};

userSchema.statics.registerNewUser = function (newUser, cb) {
  let dbUserRef;
  this.findOne({ email: newUser.email }).exec()
  .then((dbUser) => {
    if (dbUser) return cb({ ERROR: 'That user already exists' });
    return BCRYPT.hashAsync(newUser.password, 12);
  })
  .then((hash) => {
    newUser.password = hash;
    return this.create(newUser);
  })
  .then((dbUser) => {
    dbUserRef = dbUser;
    return dbUser.profileLink();
  })
  .then((link) => {
    dbUserRef.profileLink = link;
    return Email.verify(dbUserRef);
  })
  .then(() => { // this thenable will execute when the user clicks the link in their email.
    dbUserRef.verified = true;
    return cb(null, dbUserRef);
  })
  .catch(err => cb(err));
};

userSchema.method.profileLink = function () {
  const expiration = moment().add(1, 'w').unix();
  const payload = {
    expiration,
    _id: this._id,
  };
  return JWT.encodeAsync(payload, JWT_SECRET);
  // .then(token => (`${HOSTED_URL}/api/users/verify/${token}`))
  // .catch(() => ('JWT encode threw Error.'));
};

userSchema.statics.authenticate = function ({ username, password }, cb) {
  if (!username || !password) return cb({ ERROR: 'Required username || password missing.' });
  let dbUserRef;
  let tokenRef;

  return this.findOne({ username }).exec()
  .then((dbUser) => {
    dbUserRef = dbUser;
    return BCRYPT.compareAsync(password, dbUser.password);
  })
  .then(() => {
    tokenRef = dbUserRef.createToken();
    dbUserRef.lastLogin = new Date();
    return dbUserRef.save();
  })
  .then((savedUser) => {
    savedUser.password = null;
    return cb({ tokenRef, savedUser });
  })
  .catch(err => cb({ ERROR: 'Authentication Error', err }));
};

userSchema.statics.authorize = function () { // add role default value to args if needed.
  return (req, res, next) => { // eslint-disable-line
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) return res.status(400).send({ ERROR: 'User note found.' });

    const token = tokenHeader.split(' ')[1]; // this will extract JWT from header.
    JWT.decodeAsync(token, JWT_SECRET)
    .then(payload => this.findById(payload._id).select({ password: false }).exec())
    .then((dbUser) => {
      req.user = dbUser;
      return next();
    })
    .catch(res.handle);
  };
};

userSchema.methods.createToken = function () {
  return JWT.encodeAsync({ _id: this._id }, JWT_SECRET);
};

const User = mongoose.model('User', userSchema);
export default User;
