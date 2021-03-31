import React from "react";
import "../../styles/outfits/new_outfit_form.css";

class NewOutfitForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { id: "", username: "", email: "" },
      name: "",
      tags: [],
      description: "",
      img_url: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.currentUser().then((result) => {
      this.setState({
        currentUser: result.data,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props
      .newOutfit(this.state)
      .then((outfit) => {
        console.log(outfit)
        this.props.history.push(`/outfit/${outfit._id}`)
      }
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
      <div className="new-outfit-form-container">
        <form className="new-outfit-form" onSubmit={this.handleSubmit}>
          <h1 className="new-outfit-form-header">
            Add a new outfit to your closet
          </h1>
          <label>Outfit Name</label>
          <input
            type="text"
            value={this.state.name}
            onChange={this.update("name")}
            placeholder="Outfit Name"
            className="new-outfit-name"
          />

          <label>Tags</label>
          <input
            type="text"
            className="new-outfit-tags"
            value={this.state.tags}
            onChange={this.update("tags")}
            placeholder="#tag"
          />

          <label>Description</label>
          <textarea
            className="new-outfit-description"
            value={this.state.description}
            onChange={this.update("description")}
            placeholder="Description"
          />

          <label>Image</label>
          <input
            type="text"
            className="new-outfit-img_url"
            value={this.state.img_url}
            onChange={this.update("img_url")}
            placeholder="Upload an Image"
          />
          <button>Create Outfit</button>
        </form>
      </div>
    );
  }
}

export default NewOutfitForm;
