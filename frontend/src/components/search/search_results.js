import React, { Component } from "react";

export default class SearchResults extends Component {
  render() {
    return (
      <div>
        {this.props.searchResults.map((result) => {
          return <div>{result.name}</div>;
        })}
      </div>
    );
  }
}
