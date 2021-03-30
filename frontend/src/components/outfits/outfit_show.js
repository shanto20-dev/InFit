import React from "react";

class OutfitShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchOutfit();
  }

  render() {
    return (
      <div>
        <ClothingItem />
      </div>
    );
  }
}
