import { call, put } from 'redux-saga/effects';
import apiActions from '../../Redux/ApiRedux';
import loginActions from '../../Redux/AuthRedux';

export default function* login(api, action) {
  const response = yield call(api.loginAttempt(action.user));
  if (response.ok) {
    yield [put(loginActions.loginSuccess(response.data)),
    put(apiActions.apiSuccess())];
  } else {
    yield put(apiActions.apiFailure(response.problem));
  }
}
