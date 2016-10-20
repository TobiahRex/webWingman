import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  userReceived: ['userObj'],
  userSettingsReceived: ['settings'],
});

// ----- Initial State ----- //
export const INITIAL_STATE = {
  userID: null,
  username: null,
  email: null,
  lastLogin: null,
  location: null,
  photoUrl: null,
  settings: null,
};

// ----- Creators ----- //

const received = ({ user }) => ({
  userID: user.id,
  username: user.username,
  email: user.email,
  lastLogin: user.lastLogin,
  location: user.location,
  photoUrl: user.photoUrl,
  settings: user.settings,
});

const changedSettings = ({ settings }) => ({
  settings,
});

const update = ({ updatedUser }) => ({
  userID: updatedUser.userID,
  username: updatedUser.username,
  email: updatedUser.email,
  lastLogin: updatedUser.lastLogin,
  location: updatedUser.location,
  photoUrl: updatedUser.photoUrl,
  settings: updatedUser.settings,
});

// ----- Create Reducer ----- //
export const userReducer = createReducer(INITIAL_STATE, {
  [Types.USER_RECEIVED]: received,
  [Types.USER_UPDATE_RECEIVED]: update,
  [Types.USER_SETTINGS_RECEIVED]: changedSettings,
});
