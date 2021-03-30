import React from "react";

class NewClothingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      category: "",
      tags: [],
      img_url: "",
      link: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //   componentDidUpdate() {
  //     this.setState({ newTweet: this.props.newTweet.text });
  //   }

  handleSubmit(e) {
    e.preventDefault();

    this.props
      .newClothing(this.state)
      .then((clothing) =>
        this.props.history.push(`/clothing/${clothing.clothing.data._id}`)
      );
  }

  update(type) {
    return (e) =>
      this.setState({
        [type]: e.currentTarget.value,
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Item Name:
              <input
                type="text"
                value={this.state.name}
                onChange={this.update("name")}
                placeholder="Item Name"
              />
            </label>
            <select name="category" onChange={this.update("category")}>
              <option value="category" disabled selected>
                Select a category
              </option>
              <option value="Top">Top</option>
              <option value="Bottom">Bottom</option>
              <option value="Dress">Dress</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Undergarment">Undergarment</option>
              <option value="Accessory">Accessory</option>
              <option value="Shoes">Shoes</option>
            </select>
            <label>
              Description:
              <textarea
                className="new-clothing-description"
                value={this.state.description}
                onChange={this.update("description")}
                placeholder="Description"
              />
            </label>
            <label>
              Tags:
              <input
                type="text"
                className="new-clothing-tags"
                value={this.state.tags}
                onChange={this.update("tags")}
                placeholder="#tag"
              />
            </label>
            <label>
              <input
                type="text"
                className="new-clothing-image"
                value={this.state.img_url}
                onChange={this.update("img_url")}
                placeholder="Upload an Image"
              />
            </label>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewClothingForm;
