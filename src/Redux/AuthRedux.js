import { createActions, createReducer } from 'reduxsauce';

// ------ Types & Creators ----- //
const { Types, Creators } = createActions({
  // called in the API
  registerUser: ['userObj'],
  // actual user info is sent to the userReducer (not here)
  registerSuccess: ['ips'],
  registerFailure: ['error'],
  loginUser: ['userCreds'],
  loginSuccess: ['username'],
  loginFailure: ['error'],
  logout: ['userID'],
  logoutSuccess: null,
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
const registerSuccess = (state, { ips, SUCCESS }) => ({
  ips,
  active: true,
  status: SUCCESS,
});

// This method tracks the device IP's that the user is CURRENTLY signed in from.
const loginSuccess = (state, { ips, SUCCESS }) => ({
  ips,
  active: true,
  status: SUCCESS,
});

const logoutSuccess = () => ({
  ips: null,
  active: false,
  error: null,
});

const loginFailure = ({ error }) => ({ error });

const registerFailure = ({ error }) => ({ error });


// ----- create Reducer ----- //
export const authReducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.REGISTER_FAILURE]: registerFailure,
});
