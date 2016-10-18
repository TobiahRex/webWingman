/* global User*/
/* TODO: Make sure you check username @ registration
if they supplied a username, then require an email.
If they supplied an email, then username is optional,
but make the value of "username" the email value &&&&
the "email" value the email.
*/

import mongoose from 'mongoose';
import Promise from 'bluebird';
import npmJWT from 'json-web-token';
import moment from 'moment';
import bcryptJS from 'bcrypt';
import Email from './utility/EmailPromise';

const BCRYPT = Promise.promisifyAll(bcryptJS);
const JWT = Promise.promisifyAll(npmJWT);

const JWT_SECRET = process.env.JWT_SECRET || 'this is a test secret';
const HOSTED_URL = process.env.HOSTED_URL;

const ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({
  roles: {
    super: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  verified: { type: Boolean, default: false },
  oAuths: [{
    type: String,
  }],
  lastLogin: { type: Date, default: Date.now },
  settings: { type: ObjectId, ref: 'Settings' },
});

userSchema.statics.obtainUsers = function (cb) {
  this.find({}).exec()
  .then(dbUsers => cb(null, dbUsers))
  .catch(err => cb(err));
};

/* ----- User Auth Methods & Statics ----- */
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
  .then((token) => {
    dbUserRef.profileLink = `${HOSTED_URL}/api/users/verify/${token}`;
    return Email.verify(dbUserRef);
  })
  .then(() => { // this thenable will execute when the user clicks the link in their email.
    dbUserRef.verified = true;
    return cb(null, dbUserRef);
  })
  .catch(err => cb(err));
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

userSchema.methods.profileLink = function () {
  const expiration = moment().add(1, 'w').unix();
  const payload = {
    expiration,
    _id: this._id,
  };
  return JWT.encodeAsync(payload, JWT_SECRET);
};
userSchema.methods.createToken = function () {
  return JWT.encodeAsync({ _id: this._id }, JWT_SECRET);
};

const User = mongoose.model('User', userSchema);
export default User;
