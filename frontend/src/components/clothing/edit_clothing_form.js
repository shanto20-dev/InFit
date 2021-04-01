import React from "react";

class EditClothingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.clothing;
    
    console.log(this.props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    // document.getElementById("clothing-card").classList.add("inactive");
    this.props.editClothing(this.state).then(() => {
      document.getElementById("clothing-card").classList.add("inactive");
      console.log(this.state)
      setTimeout(() => {   
          this.props.history.push(`/clothing/${this.state._id}`);
      }, 100)
    })
    
    
  }

  componentDidMount() {
    this.setState({
      tagText: ""
    })
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
    let currentTags = ""
    
    if (this.state.tags) {
      currentTags = this.state.tags.map((tag, i) => {
        return (
          <span key={i} className="tag">{tag}<span className="delete-tag" id={i} onClick={this.removeTag}>X</span></span>
        )
      })
    }

    return (
      <div className="clothing-edit-container">
        <form onSubmit={this.handleSubmit} className="clothing-card" id="clothing-card">
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
              defaultValue={this.state.category}
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
            <div className = "tags-div">
              <h2 className="title clothing-tags">Tags:</h2>
              <input
                type="text"
                className="edit-clothing-tags"
                value={this.state.tagText}
                onChange={this.update("tagText")}
                placeholder="#tag"
              />
              <span className="add-tag" onClick={this.addTag}>+</span>
            </div>
            <div className="current-tags">
              {currentTags}
            </div>
            
            <button className="submit-edit">Submit</button>
          </div>
          
        </form>
      </div>
      // <form onSubmit={this.handleSubmit}>
      //   <div>
      //     <label>
      //       Item Name:
      //       <input
      //         type="text"
      //         value={this.state.name}
      //         onChange={this.update("name")}
      //         placeholder="Item Name"
      //         className="edit-clothing-name"
      //       />
      //     </label>
      //     <select
      //       name="category"
      //       defaultValue="category"
      //       onChange={this.update("category")}
      //       className="edit-clothing-category-dropdown"
      //     >
      //       <option value="category" disabled>
      //         Select a category
      //       </option>
      //       <option value="Top">Top</option>
      //       <option value="Bottom">Bottom</option>
      //       <option value="Dress">Dress</option>
      //       <option value="Outerwear">Outerwear</option>
      //       <option value="Undergarment">Undergarment</option>
      //       <option value="Accessory">Accessory</option>
      //       <option value="Shoes">Shoes</option>
      //     </select>
      //     <label>
      //       Description:
      //       <textarea
      //         className="edit-clothing-description"
      //         value={this.state.description}
      //         onChange={this.update("description")}
      //         placeholder="Description"
      //       />
      //     </label>
      //     <label>
      //       Tags:
      //       <input
      //         type="text"
      //         className="edit-clothing-tags"
      //         value={this.state.tags}
      //         onChange={this.update("tags")}
      //         placeholder="#tag"
      //       />
      //     </label>
      //     <label>
      //       <input
      //         type="text"
      //         className="edit-clothing-image"
      //         value={this.state.img_url}
      //         onChange={this.update("img_url")}
      //         placeholder="Upload an Image"
      //       />
      //     </label>
      //     <button>Submit</button>
      //   </div>
      // </form>
      // </div>
    );
  }
}

export default EditClothingForm;
