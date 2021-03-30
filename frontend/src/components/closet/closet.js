import React, { Component } from "react";
import { Link } from "react-router-dom";

import uploadClothesIcon from "../../assets/icons/uploadClothes.png";

import "../../styles/closet/closet.css";
import Clothes from "./clothes";
import Outfits from "./outfits";
import Overview from "./overview";

export default class Closet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { id: "", username: "", email: "" },
      selectedSidebar: "overview",
    };

    this.updateSelected = this.updateSelected.bind(this);
  }

  componentDidMount() {
    this.props.currentUser().then((result) => {
      this.setState({
        currentUser: result.data,
      });
    });
  }

  updateSelected(field) {
    return (e) => {
      e.preventDefault();
      this.setState({
        selectedSidebar: field,
      });
    };
  }

  render() {
    let overviewClass = "";
    let clothesClass = "";
    let outfitsClass = "";
    let currentContent = "";
    if (this.state.selectedSidebar === "overview") {
      overviewClass = "selected";
      currentContent = <Overview />;
    } else if (this.state.selectedSidebar === "clothes") {
      clothesClass = "selected";
      currentContent = <Clothes />;
    } else if (this.state.selectedSidebar === "outfits") {
      outfitsClass = "selected";
      currentContent = <Outfits />;
    }

    return (
      <div className="closet-wrapper">
        <div className="sidebar">
          <div className="sidebar-content">
            <h2>{this.state.currentUser.username}'s Closet</h2>
            <div className="divider"></div>
            <h3
              className={overviewClass}
              onClick={this.updateSelected("overview")}
            >
              Overview
            </h3>
            <div className="divider"></div>
            <h3
              className={clothesClass}
              onClick={this.updateSelected("clothes")}
            >
              Clothes
            </h3>
            <h3
              className={outfitsClass}
              onClick={this.updateSelected("outfits")}
            >
              Outfits
            </h3>
          </div>
        </div>
        <div className="content">
          <div className="upload-clothes-wrapper">
            <Link to="/clothing/new">
              <img src={uploadClothesIcon} alt="" />
            </Link>
            <span>Add Clothing</span>
            <div className="hider"></div>
          </div>
          {currentContent}
        </div>
      </div>
    );
  }
}
