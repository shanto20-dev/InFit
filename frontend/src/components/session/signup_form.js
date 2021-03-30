import React from "react";
import { withRouter, Link } from "react-router-dom";

import '../../styles/user_auth/signup.css'
import logoWhite from '../../assets/InfitLogoWhite.png'

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.switchForm = this.switchForm.bind(this)
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.signup(user).then(() => this.props.history.push("/tweets"));
  }

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

    document.getElementById("signup-form").classList.add("inactive");

    setTimeout(() => {
      this.props.history.push("/login")
    }, 200)
  }

  render() {
    return (
      <div className="signup-form-container">
        <Link to="/"><img className="logo" src={logoWhite} alt=""/></Link>
        <div id="signup-form" className="signup-form">
          <h1>Create an Account</h1>
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
              <label>USERNAME</label>
              <input
                type="text"
                value={this.state.username}
                onChange={this.update("username")}
                placeholder="Username"
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
            <div className="field">
              <label>CONFIRM PASSWORD</label>
              <input
                type="password"
                value={this.state.password2}
                onChange={this.update("password2")}
                placeholder="Confirm Password"
              />
            </div>
            <input type="submit" value="Sign Up" />
            <h3>Already have an account? <span onClick={this.switchForm}>Log In</span></h3>
            {this.renderErrors()}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
