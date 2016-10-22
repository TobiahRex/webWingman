import { combineReducers } from 'redux';
import configureStore from './configureStore';
import rootSaga from '../Sagas/';

// ------- Reducer Imports ------- //

import { thingReducer as things } from '../Redux/ThingRedux';
import { apiReducer as api } from '../Redux/ApiRedux';
import { activeUserReducer as activeUsers } from '../Redux/ActiveUsersRedux';
import { userReducer as user } from '../Redux/UserRedux';
import { authReducer as auth } from '../Redux/AuthRedux';

export default () => {
  const rootReducer = combineReducers({
    user,
    activeUsers,
    things,
    api,
    auth,
  });
  return configureStore(rootReducer, rootSaga);
};
