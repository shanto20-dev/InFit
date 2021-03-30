import React from "react";
import ClothingItem from "../clothing/clothing_item";

class OutfitShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchOutfit();
  }

  render() {
    return <div>{/* <ClothingItem clothing={clothing} /> */}</div>;
  }
}

export default OutfitShow;
