import React from "react";
import { withRouter, Link } from "react-router-dom";

import "../../styles/user_auth/login.css";
import logoWhite from "../../assets/InfitLogoWhite.png";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.switchForm = this.switchForm.bind(this);
  }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user).then(() => this.props.history.push("/closet"));
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  switchForm(event) {
    event.preventDefault();

    document.getElementById("login-form").classList.add("inactive");

    setTimeout(() => {
      this.props.history.push("/signup");
    }, 200);
  }

  render() {
    return (
      <div className="login-form-container">
        <Link to="/">
          <img className="logo" src={logoWhite} alt="" />
        </Link>
        <div id="login-form" className="login-form">
          <h1>Welcome Back!</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label>EMAIL</label>
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
            </div>
            <div className="field">
              <label>PASSWORD</label>
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
              />
            </div>
            <input type="submit" value="Submit" />
            <h3>
              Need an account? <span onClick={this.switchForm}>Register</span>
            </h3>
            {this.renderErrors()}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
