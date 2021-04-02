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
      tagText: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addTag = this.addTag.bind(this)
    this.removeTag = this.removeTag.bind(this)
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
      .then((action) => {
        this.props.history.push(`/outfit/${action.outfit.data._id}`)
      }
      );
  }

  update(type) {
    return (e) =>
      this.setState({
        [type]: e.currentTarget.value,
      });
  }

  addTag(e) {
    e.preventDefault();
    if (this.state.tagText === "") return;
    if (this.state.tags.includes("#" + this.state.tagText)) return;
    let current = this.state.tags;
    current.push("#" + this.state.tagText);
    this.setState({
      tags: current,
      tagText: ""
    })
  }

  removeTag(e) {
    e.preventDefault();
    let current = this.state.tags;
    current.splice(e.currentTarget.id, 1)
    this.setState({
      tags: current
    })
  }

  render() {

    let currentTags = this.state.tags.map((tag, i) => {
      return (
        <span key={i} className="tag">{tag}<span className="delete-tag" id={i} onClick={this.removeTag}>X</span></span>
      )
    })

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
          <div className = "tags-div">
            <input
              type="text"
              className="new-outfit-tags field"
              value={this.state.tagText}
              onChange={this.update("tagText")}
              placeholder="#tag"
            />
            <span className="add-tag" onClick={this.addTag}>+</span>
          </div>
          <div className="current-tags">
            {currentTags}
          </div>

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
