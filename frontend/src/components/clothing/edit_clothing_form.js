import React from "react";

class EditClothingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.clothing;
    console.log(this.props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.editClothing(this.state).then(
      (clothing) =>
        this.props.history.push(`/clothing/${clothing.clothing.data._id}`)
      // console.log(clothing.clothing.data._id)
    );
  }

  componentDidMount() {
    if (!this.props.clothing._id)
      this.props
        .getClothing(this.props.match.params.id)
        .then(() => this.setState(this.props.clothing));
  }

  update(type) {
    return (e) =>
      this.setState({
        [type]: e.currentTarget.value,
      });
  }

  render() {
    return (
      <div className="clothing-edit-container">
        <form onSubmit={this.handleSubmit} className="clothing-card">
          <div className="image-container">
            <img className="clothing-image" src={this.state.img_url} alt="" />
          </div>

          <div className="clothing-info">
            <h1 className="title clothing-name">Item Name:</h1>
            <input
              type="text"
              value={this.state.name}
              onChange={this.update("name")}
              placeholder="Item Name"
              className="edit-clothing-name"
            />
            <h2 className="title clothing-category">Category:</h2>
            <select
              name="category"
              defaultValue="category"
              onChange={this.update("category")}
              className="edit-clothing-category-dropdown"
            >
              <option value="category" disabled>
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
            <h2 className="title clothing-description">Description:</h2>
            <textarea
              className="edit-clothing-description"
              value={this.state.description}
              onChange={this.update("description")}
              placeholder="Description"
            />
            <h2 className="title clothing-tags">Tags:</h2>
            <input
              type="text"
              className="edit-clothing-tags"
              value={this.state.tags}
              onChange={this.update("tags")}
              placeholder="#tag"
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default EditClothingForm;
