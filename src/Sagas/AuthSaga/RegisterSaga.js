import { call, put } from 'redux-saga/effects';
import authActions from '../../Redux/AuthRedux';
import userActions from '../../Redux/UserRedux';
import apiActions from '../../Redux/ApiRedux';

export default function* (api, action) {
  const response = yield call(() => api.register(action));
  if (response.ok) {
    yield [put(authActions.registerSuccess(response.data.user.activeDevices)),
    put(userActions.userReceived(response.data.user)),
    put(apiActions.apiSuccess(response.data))];
  } else {
    yield [put(authActions.registerFailure(response.problem)),
    put(apiActions.apiFail(response.problem))];
  }
}
