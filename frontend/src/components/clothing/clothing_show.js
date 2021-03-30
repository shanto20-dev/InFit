import React from "react";
import { Link } from "react-router-dom";
import "../../styles/clothing/clothing-show.css";

class ClothingShow extends React.Component {
  componentDidMount() {
    this.props.getClothing(this.props.match.params._id);
  }

  render() {
    const clothing = this.props.clothing._id ? (
      <div className="clothing-show-container">
        <div className="clothing-card">
          <div className="image-container">
            <img
              className="clothing-image"
              src={this.props.clothing.img_url}
              alt=""
            />
          </div>

          <div className="clothing-info">
            <h1 className="title clothing-name">Item Name:</h1>
            <p>{this.props.clothing.name}</p>
            <h2 className="title clothing-category">Category:</h2>
            <p>{this.props.clothing.category}</p>
            <h2 className="title clothing-description">Description:</h2>
            <p>{this.props.clothing.description}</p>
            <h2 className="title clothing-tags">Tags:</h2>
            <p>{this.props.clothing.tags}</p>
          </div>
          <div className="edit-button">
            <Link to={`/clothing/${this.props.clothing._id}/edit`}>Edit</Link>
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
