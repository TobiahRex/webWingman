import { createActions, createReducer } from 'reduxsauce';

// ------ Types & Creators ----- //
const { Types, Creators } = createActions({
  registerAttempt: null,
  registerSuccess: null,
  loginAttempt: ['userInfo'],
  loginSuccess: ['token'],
  loginFailure: ['error'],
  logout: null,
});

export const AuthTypes = Types;
export default Creators;
export const INITIAL_STATE = {
  username: null,
  error: null,
  attempting: false,
};

// ----- Response Actions ----- //
const registerAttempt = () => ({
  attempting: true,
});

const registerSuccess = () => ({
  active: true,
  attempting: false,
});

const loginAttempt = () => ({
  attempting: true,
});

const loginSuccess = (state, { username }) => ({
  username,
  active: true,
  attempting: false,
});

const loginFailure = (state, { error }) => ({
  error,
  attempting: false,
});

const logout = (state, { uid }) => ({
  uid,
  attempting: false,
});


// ----- create Reducer ----- //
export const authReducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_ATTEMPT]: registerAttempt,
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.LOGIN_ATTEMPT]: loginAttempt,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
});
