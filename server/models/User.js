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
import Email from './Services/EmailPromise';

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
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  registration: {
    emailSent: { type: Date },
    verified: { type: Date },
    verifyLink: { type: String },
  },
  oAuths: [{
    type: String,
  }],
  location: { type: String },
  photoUrl: { type: String },
  lastLogin: { type: Date },
  activeDevices: [
    {
      ip: { type: String },
    },
  ],
  settings: { type: ObjectId, ref: 'Settings' },
});

/* ----- User Auth Methods & Statics ----- */
userSchema.statics.registerNewUser = function (newUser, result, cb) {
  console.log('ip result: ', result);
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
    dbUserRef.registration.verifyLink = `${HOSTED_URL}/api/users/verify/${token}`;
    dbUserRef.activeDevices.push(header.origin);
    return dbUserRef.save();
  })
  .then(savedUser => Email.verify(savedUser))
  .then(() => {
    dbUserRef.registration.emailSent = moment().format('lll');
    return dbUserRef.save();
  })
  .then((savedUser) => {
    savedUser.password = null;
    return cb(null, {
      SUCCESS: `Congatulations! You've been Registerd.
      A Verification email has been sent to your email.
      Please click the link to confirm your account.`,
      user: savedUser,
    });
  })
  .catch(err => cb(err));
};
userSchema.statics.authenticate = function ({ username, password }, cb) {
  if (!username || !password) return cb({ ERROR: 'Required username || password missing.' });
  let dbUserRef;
  let tokenRef;
  return this.findOne({ username }, 'password')
  .then((dbUser) => {
    dbUserRef = dbUser;
    return BCRYPT.compareAsync(password, dbUser.password);
  })
  .then(() => {
    tokenRef = dbUserRef.createToken();
    dbUserRef.lastLogin = moment().format('lll');
    return dbUserRef.save();
  })
  .then((savedUser) => {
    savedUser.password = null;
    return cb({ tokenRef, savedUser });
  })
  .catch(err => cb({ ERROR: 'Login Error.  Verify Username & Password.', err }));
};
userSchema.statics.authorize = function () { // add role default value to args if needed.
  return (req, res, next) => { // eslint-disable-line
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) return res.status(400).send({ ERROR: 'User not found.' });

    const token = tokenHeader.split(' ')[1]; // this will extract JWT from header by removing "Bearer" prefix.
    JWT.decodeAsync(JWT_SECRET, token)
    .then(payload => this.findById(payload._id).select({ password: false }).exec())
    .then((dbUser) => {
      req.user = dbUser;
      return next();
    })
    .catch(res.handle);
  };
};

// ----- Register Helper Methods ----- //
userSchema.statics.emailVerified = function (token, cb) {
  if (!token) return cb({ ERROR: 'Missing required token.' });

  JWT.decodeAsync(JWT_SECRET, token)
  .then(payload => this.findById(payload._id).exec())
  .then((dbUser) => {
    dbUser.registration.verified = moment().format('lll');
    return dbUser.save();
  })
  .then((savedUser) => {
    savedUser.password = null;
    return cb(null, savedUser);
  })
  .catch(err => cb({ ERROR: 'Could not verify email.', err }));
};
userSchema.methods.profileLink = function () {
  const expiration = moment().add(1, 'w').unix();
  const payload = {
    expiration,
    _id: this._id,
  };
  return JWT.encodeAsync(JWT_SECRET, payload);
};
userSchema.methods.createToken = function () {
  return JWT.encodeAsync(JWT_SECRET, { _id: this._id });
};

const User = mongoose.model('User', userSchema);
export default User;
