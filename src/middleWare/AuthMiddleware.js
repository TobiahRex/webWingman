import React from "react";
import * as types from "../actions/actionTypes";
import * as UserActions from "../actions/UserActions";

// This is middleware using THUNK.
const CheckActiveUser = store => next => action => {
  if (action.type !== types.CHECK_ACTIVE_USER) return next(action);

  if (localStorage.profile && localStorage.id_token) {
    const profile = JSON.parse(localStorage.profile);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      headers,
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({ email: profile.email }),
    };
    fetch("/api/users/login", options)
    .then(response => response.json())
    .then((parsedResponse) => {
      profile.userBeerData = parsedResponse;
      store.dispatch(UserActions.activeUserConfirmed(profile));
      return next(action);
    })
    .catch((error) => {
      console.error('Error: ', error);
      return next(action);
    });
  } else {
    return next(action);
  }
};

export default {CheckActiveUser};
