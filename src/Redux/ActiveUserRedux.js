import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  activeUsersReceived: ['users'],
});

export const ActiveUserTypes = Types;
export default Creators;

// ------ Initial State ------ //
export const INITIAL_STATE = {
  users: null,
};

// ------ Creators ------ //
const usersReceived = ({ users }) => ({
  users,
});

// ------ createReducer ------ //
export const activeUserReducer = createReducer(INITIAL_STATE, {
  [Types.ACTIVE_USERS_RECEIVED]: usersReceived,
});
