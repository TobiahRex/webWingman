import { call, put } from 'redux-saga/effects';
import apiActions from '../../Redux/ApiRedux';
import loginActions from '../../Redux/AuthRedux';
import userActions from '../../Redux/UserRedux';

export default function* login(api, action) {
  const response = yield call(api.login(action.user));
  if (response.ok) {
    yield [put(loginActions.loginSuccess(response.data, response.data.SUCCESS)),
      put(userActions.userReceived(response.data.user)),
    put(apiActions.apiSuccess())];
  } else {
    yield [put(loginActions.loginFailure(response.problem, response.data.ERROR)),
      put(apiActions.apiFailure())];
  }
}
