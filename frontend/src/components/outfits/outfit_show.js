import React from "react";
import ClothingItem from "../clothing/clothing_item";

class OutfitShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getOutfit(this.props.match.params.id);
  }

  render() {
    const mappedItems = this.props.outfit._id
      ? this.props.outfit.clothes.map((itemId) => {
          return (
            <ClothingItem
              clothingId={itemId}
              getClothing={this.props.getClothing}
            />
          );
        })
      : "";

    return (
      <div>
        <h1>Outfit</h1>
        <p>{this.props.outfit.name}</p>
        <p>{this.props.outfit.description}</p>
        <p>{this.props.outfit.tags}</p>
        {mappedItems}
      </div>
    );
  }
}

export default OutfitShow;
