import React from "react";
import { Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import NavbarContainer from "./nav/navbar_container";
import LandingPage from "./landing_page/landing_page";
import ClothingShowContainer from "./clothing/clothing_show_container";
import NewClothingFormContainer from "./clothing/new_clothing_form_container";
import ClosetContainer from "./closet/closet_container";
import NewOutfitFormContainer from "./outfits/new_outfit_form_container";
import EditClothingFormContainer from "./clothing/edit_clothing_form_container";

import tabLogo from "../assets/tabLogo.png";
import OutfitShowContainer from "./outfits/outfit_show_container";

const App = () => (
  <div className="app-div">
    <link rel="shortcut icon" type="image/png" src={tabLogo}></link>
    <NavbarContainer />
    <Switch>
      <ProtectedRoute exact path="/closet" component={ClosetContainer} />
      <ProtectedRoute
        exact
        path="/clothing/new"
        component={NewClothingFormContainer}
      />
      <ProtectedRoute
        exact
        path="/outfit/new"
        component={NewOutfitFormContainer}
      />
      <ProtectedRoute
        exact
        path="/outfit/:id"
        component={OutfitShowContainer}
      />
      <ProtectedRoute
        exact
        path="/clothing/:id/edit"
        component={EditClothingFormContainer}
      />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/clothing/:_id" component={ClothingShowContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>
  </div>
);

export default App;
