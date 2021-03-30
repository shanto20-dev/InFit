import React, { Component } from "react";
import OutfitItem from "../outfits/outfit_item";

export default class Outfits extends Component {
  render() {
    return (
      <div>
        {this.props.outfits.map((outfit) => {
          return <OutfitItem outfit={outfit} />;
        })}
      </div>
    );
  }
}
