import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  userReceived: ['user'],
  userSettingsReceived: ['settings'],
});
export const userTypes = Types;
export default Creators;

// ----- Initial State ----- //
export const INITIAL_STATE = {
  _id: null,
  firstName: null,
  lastName: null,
  email: null,
  lastLogin: null,
  location: null,
  photoUrl: null,
  verified: null,
  settings: null,
};

// ----- Creators ----- //

const received = (state, { user }) => {
  console.log('user: ', user);

  const userObj = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    lastLogin: user.lastLogin,
    location: user.location,
    photoUrl: user.photoUrl,
    verified: user.registration.verified,
    settings: user.settings,
  };

  return ({ user: userObj });
};

const changedSettings = (state, { settings }) => ({
  settings,
});

// ----- Create Reducer ----- //
export const userReducer = createReducer(INITIAL_STATE, {
  [Types.USER_RECEIVED]: received,
  [Types.USER_UPDATE_RECEIVED]: received,
  [Types.USER_SETTINGS_RECEIVED]: changedSettings,
});
