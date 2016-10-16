import React from "react";
import * as types from "../actions/actionTypes";
import * as UserActions from "../actions/UserActions";

// This is middleware using THUNK.
const CheckActiveUser = store =>
next =>
action => {
  if (action.type !== types.CHECK_ACTIVE_USER) return next(action);
  if (localStorage.profile && localStorage.id_token) {
    let profile = JSON.parse(localStorage.profile);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = {
      method: "POST",
      credentials: "same-origin",
      headers: headers,
      mode: "cors",
      cache: "default",
      body: JSON.stringify({email: profile.email})
    };
    fetch("/api/users/login", options)
    .then(response => {
      return response.json();
    })
    .then(parsedResponse => {
      profile.userBeerData = parsedResponse;
      store.dispatch(UserActions.activeUserConfirmed(profile));
      return next(action);
    })
    .catch(error => {
      console.log("Error: ", error);
      return next(action);
    });
  } else {
    return next(action);
  }
};

export default {CheckActiveUser};
