import React from "react";

class ClothingShow extends React.Component {
  componentDidMount() {
    this.props.getClothing();
  }

  render() {
    const clothing = this.props.clothing.length ? (
      <div>
        {this.props.clothing.name}
        {this.props.clothing.category}
      </div>
    ) : (
      <div>Loading</div>
    );

    return <div>{clothing}</div>;
  }
}

export default ClothingShow;
