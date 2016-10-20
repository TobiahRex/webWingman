import { createActions, createReducer } from 'reduxsauce';

// ------ Types & Creators ----- //
const { Types, Creators } = createActions({
  registerUser: ['userObj'],  // called in the API
  registerSuccess: ['ips'],   // actual user info is sent to the userReducer (not here)
  registerFailure: ['error'],
  loginSuccess: ['username'],
  loginFailure: ['error'],
  logout: ['userID'],
});

export const AuthTypes = Types;
export default Creators;
export const INITIAL_STATE = {
  active: true,
  username: null,
  error: null,
};

// ----- Response Actions ----- //

// This method tracks the device IP's that the user has registered from.
const registerSuccess = (state, ips) => ({
  ips,
  active: true,
});

// This method tracks the device IP's that the user is CURRENTLY signed in from.
const loginSuccess = (state, { username, ips }) => ({
  ips,
  username,
  active: true,
});

const loginFailure = ({ error }) => ({
  error,
});

const registerFailure = ({ error }) => ({
  error,
});


// ----- create Reducer ----- //
export const authReducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.REGISTER_FAILURE]: registerFailure,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
});
