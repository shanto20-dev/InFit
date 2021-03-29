import React from "react";
import { Route } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import NavbarContainer from "./nav/navbar_container";
import LandingPage from './landing_page/landing_page'

const App = () => (
  <div>
    <NavbarContainer />
    <Switch>
      <Route path="/" component={LandingPage}/>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>
  </div>
);

export default App;
