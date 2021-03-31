import React from "react";
import { Link } from "react-router-dom";
import ClothingItem from "../clothing/clothing_item";

class OutfitShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = { renderClothes: false, newClothes: [] };
    this.renderOwnedClothes = this.renderOwnedClothes.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.props.getOutfit(this.props.match.params.id);
    this.props.currentUser().then((result) => {
      let thisUser = result.data;
      this.setState({
        currentUser: thisUser,
      });
      this.props.getUserClothing(thisUser.id);
    });
  }

  renderOwnedClothes() {
    // if (this.props.clothes) {
    //   Object.values(this.props.clothes).map((cloth, i) => {
    //     let clothUrl = `/clothing/${cloth._id}`;
    //     return (
    //       <div className="clothing-item" key={i}>
    //         <Link to={clothUrl}>
    //           <div className="shadow"></div>
    //           <img src={cloth.img_url} alt="" />
    //           <h3>{cloth.name}</h3>
    //         </Link>
    //       </div>
    //     );
    //   });
    // }
  }

  addToOutfit(id) {
    if (!this.state.newClothes.includes(id))
      this.setState({ newClothes: [...this.state.newClothes, id] });
  }

  handleSave() {
    this.props.updateOutfit({
      id: this.props.match.params.id,
      clothes: this.state.newClothes,
    });
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
    let clothingElements;
    if (this.props.clothes && this.state.renderClothes) {
      clothingElements = Object.values(this.props.clothes).map((cloth, i) => {
        return (
          <div
            onClick={() => this.addToOutfit(cloth._id)}
            className="clothing-item"
            key={i}
          >
            <div className="shadow"></div>
            <img src={cloth.img_url} alt="" />
            <h3>{cloth.name}</h3>
          </div>
        );
      });
    }

    return (
      <div>
        <h1>Outfit</h1>
        <p>{this.props.outfit.name}</p>
        <p>{this.props.outfit.description}</p>
        <p>{this.props.outfit.tags}</p>
        {mappedItems}

        <button
          onClick={() =>
            this.setState({ renderClothes: !this.state.renderClothes })
          }
        >
          Add clothes to this outfit
        </button>

        {clothingElements}

        <button onClick={this.handleSave}>Save Outfit</button>
      </div>
    );
  }
}

export default OutfitShow;
