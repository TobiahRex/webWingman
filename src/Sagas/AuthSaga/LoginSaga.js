import { call, put } from 'redux-saga/effects';
import authActions from '../../Redux/AuthRedux';
import userActions from '../../Redux/UserRedux';
import apiActions from '../../Redux/ApiRedux';

export default function* login(api, action) {
  const response = yield call(() => api.login(action));
  if (response.ok) {
    console.log('response: ', response);

    let { fullfillmentValue: token } = response.data.tokenRef;
    token = `Bearer ${token}`;
    localStorage.setItem('userToken', { token, user: response.data.savedUser._id });

    yield [put(authActions.loginSuccess(response.data.activeDevices, response.data.SUCCESS)),
      put(userActions.userReceived(response.data.savedUser)),
    put(apiActions.apiSuccess())];
  } else {
    yield [put(authActions.loginFailure(response.data.ERROR)),
      put(apiActions.apiFail())];
  }
}
