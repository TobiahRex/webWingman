import { call, put } from 'redux-saga/effects';
import registerActions from '../../Redux/AuthRedux';
import userActions from '../../Redux/UserRedux';
import apiActions from '../../Services/API';

export default function* (api, action) {
  const response = yield call(() => api.register(action));
  if (response.ok) {
    yield [put(registerActions.registerSuccess(response.data.activeDevices)),
    put(userActions.userReceived(response.data)),
    put(apiActions.apiSuccess(response.Data))];
  } else {
    yield [put(registerActions.registerFailure(response.problem)),
    put(apiActions.apiFail(response.problem))];
  }
}
