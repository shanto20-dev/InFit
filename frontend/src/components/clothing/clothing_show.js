import React from "react";
import { Link } from "react-router-dom";
import "../../styles/clothing/clothing-show.css";

class ClothingShow extends React.Component {
    constructor(props) {
        super(props);
        this.switchForm = this.switchForm.bind(this);
        this.searchOutfits = this.searchOutfits.bind(this);
        this.goBack = this.goBack.bind(this);
        this.toggleLike = this.toggleLike.bind(this);

        this.state = {
            currentUser: { id: 0 },
            liked: this.props.likes.some(
                (like) => like._id === this.props.match.params._id
            ),
        };
    }

    componentDidMount() {
        this.props.getClothing(this.props.match.params._id);
        this.props.currentUser().then((result) => {
            let thisUser = result.data;
            this.setState({
                currentUser: thisUser,
            });
            this.props.getUserLikes(thisUser.id).then(() =>
                this.setState({
                    liked: this.props.likes.some(
                        (like) => like._id === this.props.match.params._id
                    ),
                })
            );
        });
    }

    switchForm(event) {
        event.preventDefault();
        document.getElementById("clothing-card").classList.add("inactive");
        setTimeout(() => {
            this.props.history.push(
                `/clothing/${this.props.clothing._id}/edit`
            );
        }, 100);
    }

    searchOutfits() {
        this.props
            .searchOutfitByClothing(this.props.match.params._id)
            .then(() => this.props.history.push("/search"));
    }

    goBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    toggleLike() {
        this.props.toggleLike(
            this.props.match.params._id,
            "clothing",
            this.props.currentUserId,
            this.state.liked
        );
        this.setState({ liked: !this.state.liked });
    }

    liked() {
        if (this.state.liked) {
            return (
                <span
                    onClick={this.toggleLike}
                    className="heart material-icons"
                >
                    favorite
                </span>
            );
        } else {
            return (
                <span
                    onClick={this.toggleLike}
                    className="heart material-icons"
                >
                    favorite_border
                </span>
            );
        }
    }

    render() {
        let editButton =
            this.props.clothing.user == this.props.currentUserId ? (
                <div className="edit-button">
                    <button onClick={this.switchForm}>Edit</button>
                </div>
            ) : (
                ""
            );

        const clothing = this.props.clothing._id ? (
            <div className="clothing-show-container">
                <span className="back-button" onClick={this.goBack}>
                    ❮ Back
                </span>
                <div className="clothing-card" id="clothing-card">
                    {this.liked()}

                    <div className="image-container">
                        <img
                            className="clothing-image"
                            src={this.props.clothing.img_url}
                            alt=""
                        />
                    </div>

                    <div className="clothing-info">
                        <h1 className="title clothing-name">Item Name:</h1>
                        <p>{this.props.clothing.name}</p>
                        <h2 className="title clothing-category">Category:</h2>
                        <p>{this.props.clothing.category}</p>
                        <h2 className="title clothing-description">
                            Description:
                        </h2>
                        <p>{this.props.clothing.description}</p>
                        <h2 className="title clothing-tags">Tags:</h2>
                        <p>{this.props.clothing.tags}</p>
                        {editButton}
                        <span
                            className="search-outfits-button"
                            onClick={this.searchOutfits}
                        >
                            Outfits with this item <span>❯</span>
                        </span>
                    </div>
                </div>
            </div>
        ) : (
            <div className="clothing-show-container">
                <div className="clothing-card" id="clothing-card"></div>
            </div>
        );

        return <div>{clothing}</div>;
    }
}

export default ClothingShow;
