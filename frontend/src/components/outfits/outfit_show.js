import React from "react";

class OutfitShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getOutfit(this.props.match.params.id)
    .then(() => this.props.outfit.clothes.push("60625fb2b3c93291d8ae77d8"));
  }

  render() {
    console.log(this.props.outfit)
    return (
      <div>
        <h1>Outfit</h1>
        <p>{this.props.outfit.name}</p>
        <p>{this.props.outfit.description}</p>
        <p>{this.props.outfit.tags}</p>
        {this.props.outfit.clothes.map(item => {
          return(
            <div>Clothing Item</div>
          )})}
      </div>
    );
  }
}

export default OutfitShow;