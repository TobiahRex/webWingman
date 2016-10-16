import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  userReceived: ['userObj'],
  logoutSuccess: null,
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

const logout = () => ({
  userID: null,
  username: null,
  email: null,
  lastLogin: null,
  location: null,
  photoUrl: null,
  settings: null,
});

// ----- Create Reducer ----- //
export const userReducer = createReducer(INITIAL_STATE, {
  [Types.USER_RECEIVED]: received,
  [Types.LOGOUT_SUCCESS]: logout,
});
