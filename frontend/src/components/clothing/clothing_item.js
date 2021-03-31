import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ClothingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props
      .getClothing(this.props.clothingId)
      .then((res) => this.setState(res.clothing));
  }

  render() {
    let clothUrl = `/clothing/${this.state._id}`;
    return (
      <div className="clothing-item">
        <Link to={clothUrl}>
          <div className="shadow"></div>
          <img src={this.state.img_url} alt="" />
          <h3>{this.state.name}</h3>
        </Link>
      </div>
    );
  }
}
