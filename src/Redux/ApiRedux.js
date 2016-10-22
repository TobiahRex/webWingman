import { createActions, createReducer } from 'reduxsauce';

// ------- Types & Creators ------- //
const { Types, Creators } = createActions({
  fetching: null,
  apiFail: ['ERROR'],
  apiSuccess: ['SUCCESS'],
});

export const ApiTypes = Types;
export default Creators;

// ------- Initial State ------- //
export const INITIAL_STATE = {
  fetching: null,
  count: 0,
  error: false,
  success: false,
};

// ------- Response Actions ------- //
const success = (state, { SUCCESS }) => ({
  fetching: false,
  count: state.fetching - 1,
  error: false,
  success: SUCCESS,
});

const fail = (state, { ERROR }) => ({
  fetching: false,
  count: state.fetching - 1,
  ERROR,
});

const fetching = state => ({
  fetching: true,
  count: state.fetching + 1,
  error: false,
});

// ------- create Reducer ------- //
export const apiReducer = createReducer(INITIAL_STATE, {
  [Types.API_FAIL]: fail,
  [Types.API_SUCCESS]: success,
  [Types.FETCHING]: fetching,
});
