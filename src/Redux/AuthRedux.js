import { createActions, createReducer } from 'reduxsauce';

// ------ Types & Creators ----- //
const { Types, Creators } = createActions({
  // called in the API
  registerUser: ['userObj'],
  // actual user info is sent to the userReducer (not here)
  registerSuccess: ['ips', 'success'],
  registerFailure: ['error'],
  loginUser: ['userCreds'],
  loginSuccess: ['ips', 'success'],
  loginFailure: ['ERROR'],
  logout: ['userID'],
  logoutSuccess: ['ips', 'success'],
});

export const AuthTypes = Types;
export default Creators;
export const INITIAL_STATE = {
  ips: null,
  active: false,
  error: null,
  status: '',
};

// ----- Response Actions ----- //

// This method tracks the device IP's that the user has registered from.
const registerSuccess = (state, { ips, success }) => ({
  ips,
  active: true,
  error: false,
  status: success,
});

// This method tracks the device IP's that the user is CURRENTLY signed in from.
const loginSuccess = (state, { ips, success }) => ({
  ips,
  active: true,
  error: false,
  status: success,
});

const logoutSuccess = (state, { ips, success }) => ({
  ips,
  active: false,
  error: false,
  status: success,
});

const loginFailure = (state, { ips, error }) => ({
  ips,
  active: false,
  error: true,
  status: error,
});

const registerFailure = (state, { error }) => ({
  active: false,
  error: true,
  status: error,
});


// ----- create Reducer ----- //
export const authReducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.REGISTER_FAILURE]: registerFailure,
});
