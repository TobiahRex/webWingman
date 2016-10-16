import firebase from 'firebase';
import { browserHistory } from 'react-router';
import apiActions from '../Redux/ApiRedux';
import activeUsersActions from '../Redux/ActiveUsersRedux';
import userActions from '../Redux/UserRedux';
import { dispatch } from '../index';

const config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  storageBucket: process.env.FIREBASE_BUCKET,
};

firebase.initializeApp(config);
const firebaseDB = firebase.database();

firebaseDB.ref('active').once('value', (snapshot) => {
  const user = snapshot.val();
  dispatch(userActions.userReceived(user));
});

// Listens for users changing their profile settings.
const setSettingsListener = () => {
  firebaseDB.ref('settings').ref('users').on('child_added', (snapshot) => {
    const settings = snapshot.val();
    dispatch(userActions.userSettingsReceived(settings));
  });
};

// Listens for incoming active users.
const setActiveUsersListener = () => {
  firebaseDB.ref('active').on('value', (snapshot) => {
    const users = snapshot.val();
    dispatch(activeUsersActions.activeUsersReceived(users));
  });
};

// Listens for this users profile updates.
const setUpdateUserListener = (userID) => {
  firebaseDB.ref(`users/${userID}`).on('child_added', (snapshot) => {
    const updatedUser = snapshot.val();
    dispatch(userActions.userUpdateReceived(updatedUser));
  });
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    setSettingsListener();
    setActiveUsersListener();
    setUpdateUserListener();
  } else {
    browserHistory.push('/Home');
  }
});

const activeUser = firebase.auth().currentUser;
if (activeUser) {
  dispatch(apiActions.userLoggedIn(activeUser.userID));
}
