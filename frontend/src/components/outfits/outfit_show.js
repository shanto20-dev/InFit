import React from "react";
import { Link } from "react-router-dom";
import ClothingItem from "../clothing/clothing_item";
import "../../styles/outfits/outfit_show.css";

class OutfitShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderClothes: false,
      newClothes: [],
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleModal = this.handleModal.bind(this);
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

  addToOutfit(id) {
    if (
      !this.state.newClothes.includes(id) &&
      !this.props.outfit.clothes.includes(id)
    )
      this.setState({
        newClothes: [
          ...this.props.outfit.clothes,
          ...this.state.newClothes,
          id,
        ],
      });
  }

  handleModal(){
    document.getElementById("modal").classList.toggle("active")
    if (!document.getElementById("modal").classList.contains("active")){
      console.log("hitting this");
      document.getElementById("modal").classList.add("inactive")
    }
    setTimeout(() => {
      document.getElementById("modal").classList.remove("inactive")
      this.setState({ renderClothes: !this.state.renderClothes })
    }, 100)
  }

  handleSave() {
    document.getElementById("modal").classList.remove("active")


    this.setState({ renderClothes: !this.state.renderClothes })
    this.props.updateOutfit({
      id: this.props.match.params.id,
      clothes: [...this.props.outfit.clothes, ...this.state.newClothes],
    });
    this.setState({ renderClothes: false });
  }

  render() {
    console.log(this.state, this.props);

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
            <Link to="#">
              <div className="shadow"></div>
              <img src={cloth.img_url} alt="" />
              <h3>{cloth.name}</h3>
            </Link>
          </div>
        );
      });
    }

    return (
      <div className="outfit-show-container">
        <div>
          <h1 className="outfit-title">{this.props.outfit.name}</h1>
          <h1 className="outfit-description">
            {this.props.outfit.description}
          </h1>
          <h1 className="outfit-tags">{this.props.outfit.tags}</h1>

          <button
            onClick={() => this.handleModal()}
          >
            Add clothes to this outfit
          </button>

          <button onClick={this.handleSave}>Save Outfit</button>
        </div>
        <div className="modal" id="modal">
          <h1 className="modal-header">Add clothes to your outfit</h1>
          <div className="clothing-elements">
          {clothingElements}
          </div>
        </div>
        <div className="outfit-clothes"> {mappedItems}</div>
      </div>
    );
  }
}

export default OutfitShow;
