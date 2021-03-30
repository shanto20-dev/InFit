import React from "react";
import { RECEIVE_SESSION_ERRORS } from "../../actions/session_actions";
import "../../styles/clothing/clothing-create.css";

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

  handleSubmit(e) {
    e.preventDefault();
    let newClothing
    this.props.newClothing(this.state).then((clothing) => {
      console.log(clothing);
      if (clothing.type !== RECEIVE_SESSION_ERRORS){
        this.props.clearErrors();
        newClothing = clothing;
        this.props.history.push(`/clothing/${clothing.clothing.data._id}`)
      };
    })
    // if (!this.props.errors) {
    //   this.props.history.push(`/clothing/${newClothing.clothing.id}`)
    // };
      // .then((clothing) =>
      //   this.props.history.push(`/clothing/${clothing.clothing.id}`)
      // );
  }

  update(type) {
    return (e) =>
      this.setState({
        [type]: e.currentTarget.value,
      });
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.props.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="clothes-form-container">
        <div className="clothes-form-card">
        <h1>Create New Clothing Item</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-details">
            <label>
              Item Name
            </label>
              <input
                type="text"
                value={this.state.name}
                onChange={this.update("name")}
                placeholder="Item Name"
                className="new-clothing-name field"
              />
            <label>
              Category
            </label>
            <select
              name="category"
              defaultValue="category"
              onChange={this.update("category")}
              className="new-clothing-category-dropdown field"
            >
              <option value="category" disabled>Select a category</option>
              <option value="Top">Top</option>
              <option value="Bottom">Bottom</option>
              <option value="Dress">Dress</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Undergarment">Undergarment</option>
              <option value="Accessory">Accessory</option>
              <option value="Shoes">Shoes</option>
            </select>
            <label>
              Description
            </label>
              <textarea
                className="new-clothing-description"
                value={this.state.description}
                onChange={this.update("description")}
                placeholder="Description"
                cols="4"
                rows="4"
              />
            <label>
              Tags
            </label>
              <input
                type="text"
                className="new-clothing-tags field"
                value={this.state.tags}
                onChange={this.update("tags")}
                placeholder="#tag"
              />
            <label>
            Image
            </label>
              <input
                type="text"
                className="new-clothing-image field"
                value={this.state.img_url}
                onChange={this.update("img_url")}
                placeholder="Upload an Image"
              />
              {this.renderErrors()}
            <button>Submit</button>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default NewClothingForm;
