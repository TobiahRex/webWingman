import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  userReceived: ['userObj'],
  userSettingsReceived: ['settings'],
});
export const userTypes = Types;
export default Creators;

// ----- Initial State ----- //
export const INITIAL_STATE = {
  _id: null,
  email: null,
  lastLogin: null,
  location: null,
  photoUrl: null,
  settings: null,
};

// ----- Creators ----- //

const received = ({ _id, email, lastLogin, location, photoUrl, settings }) => ({
  _id,
  email,
  lastLogin,
  location,
  photoUrl,
  settings,
});

const changedSettings = ({ settings }) => ({
  settings,
});

// ----- Create Reducer ----- //
export const userReducer = createReducer(INITIAL_STATE, {
  [Types.USER_RECEIVED]: received,
  [Types.USER_UPDATE_RECEIVED]: received,
  [Types.USER_SETTINGS_RECEIVED]: changedSettings,
});
