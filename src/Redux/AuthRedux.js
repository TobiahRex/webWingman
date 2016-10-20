import { createActions, createReducer } from 'reduxsauce';

// ------ Types & Creators ----- //
const { Types, Creators } = createActions({
  registerUser: ['userObj'],
  registerSuccess: [null],
  registerFailure: ['error'],
  loginSuccess: ['username'],
  loginFailure: ['error'],
  logout: ['userID'],
});

export const AuthTypes = Types;
export default Creators;
export const INITIAL_STATE = {
  username: null,
  error: null,
};

// ----- Response Actions ----- //

const registerSuccess = () => ({
  active: true,
});

const loginSuccess = ({ username }) => ({
  username,
  active: true,
});

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
