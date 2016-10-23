import { takeLatest } from 'redux-saga';
import API from '../Services/API';

// ----- Thing Sagas ----- //
import GetAllThings from './ThingSagas/GetAllThings';
import CreateThing from './ThingSagas/CreateThing';
import EditThing from './ThingSagas/EditThing';
import RemoveThing from './ThingSagas/RemoveThing';
import { ThingTypes } from '../Redux/ThingRedux';
import { AuthTypes } from '../Redux/AuthRedux';

// ----- Auth Sagas ----- //
import RegisterUser from './AuthSaga/RegisterSaga';
import LoginUser from './AuthSaga/LoginSaga';

const api = API.createAPI();
export default function* rootSaga() {
  yield [takeLatest(AuthTypes.REGISTER_USER, RegisterUser, api),
  takeLatest(AuthTypes.LOGIN_USER, LoginUser, api),
  // ----- Thing Types ----- //
  takeLatest(ThingTypes.GET_ALL_THINGS, GetAllThings, api),
  takeLatest(ThingTypes.CREATE_THING, CreateThing, api),
  takeLatest(ThingTypes.REMOVE_THING, RemoveThing, api),
  takeLatest(ThingTypes.EDIT_THING, EditThing, api)];
}
