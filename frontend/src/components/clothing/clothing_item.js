import React, { Component } from "react";

export default class ClothingItem extends Component {
  componentDidMount() {
    this.props.getClothing(this.props.clothingId);
  }

  render() {
    return <div>Clothing Item</div>;
  }
}
