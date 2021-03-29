import React from "react";
import { Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import NavbarContainer from "./nav/navbar_container";
import LandingPage from "./landing_page/landing_page";

import tabLogo from "../assets/tabLogo.png";
import ClothingShowContainer from "./clothing/clothing_show_container";

const App = () => (
  <div className="app-div">
    <link rel="shortcut icon" href={tabLogo}></link>
    <NavbarContainer />
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/clothing/:id" component={ClothingShowContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>
  </div>
);

export default App;
