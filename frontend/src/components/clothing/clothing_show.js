import React from "react";
import "../../styles/clothing/clothing-show.css";

class ClothingShow extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.getClothing(this.props.match.params._id);
  }

  render() {
    const clothing = this.props.clothing._id ? (
      <div className="clothing-show-container">
        <div className="clothing-card">
          <div className="image-container">
            <img className="clothing-image" src={this.props.clothing.img_url} />
          </div>

          <div className="clothing-info">
            <h1 className="title clothing-name">Item Name:</h1>
            <p>{this.props.clothing.name}</p>
            <h2 className="title clothing-category">Category:</h2>
            <p>{this.props.clothing.category}</p>
            <h2 className="title clothing-description">Description:</h2>
            <p>{this.props.clothing.description}</p>

            <p>{this.props.clothing.tags}</p>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading</div>
    );

    return <div>{clothing}</div>;
  }
}

export default ClothingShow;
