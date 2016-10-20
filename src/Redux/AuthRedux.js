import { createActions, createReducer } from 'reduxsauce';

// ------ Types & Creators ----- //
const { Types, Creators } = createActions({
  registerUser: ['userObj'],
  registerSuccess: ['deviceIP'], // the new user info gets sent to the userReducer
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
const registerSuccess = (state, { activeDevice }) => {
  const activeIP = state.activeIP;
  activeIP.push({ activeDevice });
  return ({
    activeIP,
    active: true,
  });
};

// This method tracks the device IP's that the user is CURRENTLY signed in from.
const loginSuccess = (state, { username, activeDevice }) => {
  const activeIP = state.activeIP;
  activeIP.push({ ip: activeDevice });
  return ({
    username,
    activeIP,
    active: true,
  });
};

const loginFailure = ({ error }) => ({
  error,
});

const registerFailure = ({ error }) => ({
  error,
});

const logout = ({ userID }) => ({
  userID,
});


// ----- create Reducer ----- //
export const authReducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.REGISTER_FAILURE]: registerFailure,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
});
