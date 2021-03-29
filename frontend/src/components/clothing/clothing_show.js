import React from "react";

class ClothingShow extends React.Component {
  componentDidMount() {
    this.props.getClothing();
  }
}
