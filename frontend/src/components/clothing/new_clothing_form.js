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
            tagText: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.nameErrors = this.nameErrors.bind(this);
        this.categoryErrors = this.categoryErrors.bind(this);
        this.imgErrors = this.imgErrors.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    handleSubmit(e) {
        e.preventDefault();
        let newClothing;
        this.props.newClothing(this.state).then((clothing) => {
            if (clothing.type !== RECEIVE_SESSION_ERRORS) {
                this.props.clearErrors();
                newClothing = clothing;
                this.props.history.push(
                    `/clothing/${clothing.clothing.data._id}`
                );
            }
        });
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

    addTag(e) {
        e.preventDefault();
        if (this.state.tagText === "") return;
        if (this.state.tags.includes("#" + this.state.tagText)) return;
        let current = this.state.tags;
        current.push("#" + this.state.tagText);
        this.setState({
            tags: current,
            tagText: "",
        });
    }

    removeTag(e) {
        e.preventDefault();
        let current = this.state.tags;
        current.splice(e.currentTarget.id, 1);
        this.setState({
            tags: current,
        });
    }

    nameErrors() {
        if (
            Object.values(this.props.errors).includes("Name field is required")
        ) {
            return " - field is required";
        }
        return "";
    }

    categoryErrors() {
        if (
            Object.values(this.props.errors).includes(
                "Category field is required"
            )
        ) {
            return " - field is required";
        }
        return "";
    }

    imgErrors() {
        if (Object.values(this.props.errors).includes("An image is required")) {
            return " - field is required";
        }
        return "";
    }

    render() {
        let currentTags = this.state.tags.map((tag, i) => {
            return (
                <span key={i} className="tag">
                    {tag}
                    <span
                        className="delete-tag"
                        id={i}
                        onClick={this.removeTag}
                    >
                        X
                    </span>
                </span>
            );
        });

        let nameStyle = {};
        let imgStyle = {};
        let categoryStyle = {};
        if (this.nameErrors() != "") {
            nameStyle = { color: "red" };
        }
        if (this.imgErrors() != "") {
            imgStyle = { color: "red" };
        }
        if (this.categoryErrors() != "") {
            categoryStyle = { color: "red" };
        }

        return (
            <div className="clothes-form-container">
                <div className="clothes-form-card">
                    <h1>Create New Clothing Item</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-details">
                            <label style={nameStyle}>
                                Item Name{this.nameErrors()}
                            </label>
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={this.update("name")}
                                placeholder="Item Name"
                                className="new-clothing-name field"
                            />
                            <label style={categoryStyle}>
                                Category{this.categoryErrors()}
                            </label>
                            <select
                                name="category"
                                defaultValue="category"
                                onChange={this.update("category")}
                                className="new-clothing-category-dropdown field"
                            >
                                <option value="category" disabled>
                                    Select a category
                                </option>
                                <option value="Top">Top</option>
                                <option value="Bottom">Bottom</option>
                                <option value="Dress">Dress</option>
                                <option value="Outerwear">Outerwear</option>
                                <option value="Undergarment">
                                    Undergarment
                                </option>
                                <option value="Accessory">Accessory</option>
                                <option value="Shoes">Shoes</option>
                            </select>
                            <label>Description</label>
                            <textarea
                                className="new-clothing-description"
                                value={this.state.description}
                                onChange={this.update("description")}
                                placeholder="Description"
                                cols="4"
                                rows="4"
                            />
                            <label>Tags</label>
                            <div className="tags-div">
                                <input
                                    type="text"
                                    className="new-clothing-tags field"
                                    value={this.state.tagText}
                                    onChange={this.update("tagText")}
                                    placeholder="#tag"
                                />
                                <span className="add-tag" onClick={this.addTag}>
                                    +
                                </span>
                            </div>
                            <div className="current-tags">{currentTags}</div>

                            <label style={imgStyle}>
                                Image URL{this.imgErrors()}
                            </label>
                            <input
                                type="text"
                                className="new-clothing-image field"
                                value={this.state.img_url}
                                onChange={this.update("img_url")}
                                placeholder="Link an image of your clothing item"
                            />
                            <label>Link to Buy</label>
                            <input
                                type="text"
                                className="new-clothing-link field"
                                value={this.state.link}
                                onChange={this.update("link")}
                                placeholder="Where can you buy this item?"
                            />
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewClothingForm;
