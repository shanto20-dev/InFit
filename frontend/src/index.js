import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./util/session_api_util";
import { logout } from "./actions/session_actions";
import {
  getAllClothing,
  getUserClothing,
  newClothing,
  destroyClothing,
} from "./actions/clothing_actions";

document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);

    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
    }
  } else {
    store = configureStore({});
  }

  const root = document.getElementById("root");

  ReactDOM.render(<Root store={store} />, root);

  // testing purposes only

  window.store = store;

  window.getAllClothing = getAllClothing;
  window.getUserClothing = getUserClothing;
  window.newClothing = newClothing;
  window.destroyClothing = destroyClothing;
});
