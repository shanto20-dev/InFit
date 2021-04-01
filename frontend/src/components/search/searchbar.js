import React, { Component } from "react";
import "../../styles/search/searchbar.css";

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(e) {
    this.setState({ term: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.term.length) {
      this.props
        .searchClothesByName(this.state.term)
        .then(() => this.setState({ term: "" }))
        .then(() => this.props.history.push("/search"));
    }
  }

  render() {
    return (
      <div className="search-container">
        <form onSubmit={this.handleSubmit} className="search">
          <div className="search-field-container">
            <input
              onChange={this.update}
              type="text"
              className="search-field"
              value={this.state.term}
              placeholder="Search"
            />
          </div>
          <div className="search-button-container">
            <button className="search-button">
              <span className="material-icons">search</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
