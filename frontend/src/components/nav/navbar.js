import React from "react";
import { Link } from "react-router-dom";

import "../../styles/navbar/navbar.css";
import Logo from "../../assets/InfitLogo.png";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to="/closet">My Closet</Link>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="login-signup">
          <Link to={"/signup"}>Signup</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="navbar-div">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
