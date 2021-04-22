import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/closet/likes.css";
import defaultPic from "../../assets/icons/defaultOutfitIcon.png";

export default class Likes extends Component {
    constructor(props) {
        super(props);

        this.state = { currentPage: 0, likes: this.props.likes, filter: "all" };

        this.heartRef = React.createRef;

        this.setPage = this.setPage.bind(this);
        this.update = this.update.bind(this);

        this.toggleLike = this.toggleLike.bind(this);
        this.updateLikes = this.updateLikes.bind(this);
    }

    setPage(val) {
        return (e) => {
            e.preventDefault();
            if (val > Math.floor(this.state.likes.length / 15)) {
                return;
            } else if (val < 0) {
                return;
            }
            this.setState(
                {
                    currentPage: val,
                },
                () => {
                    this.updateItems();
                }
            );
        };
    }

    update(e) {
        this.setState({
            filter: e.target.value,
            currentPage: 0,
        });
    }

    toggleLike(e) {
        let dataid = e.target.getAttribute("dataid");
        let datatype = e.target.getAttribute("datatype");
        this.props.toggleLike(
            dataid,
            datatype,
            this.props.currentUser.id,
            true
        );
    }

    updateLikes() {
        this.props
            .getUserLikes(this.props.currentUser.id)
            .then(() => this.setState({ likes: this.props.likes }));
    }

    render() {
        console.log(this.state);

        const clothing = [];
        const outfit = [];

        this.state.likes.forEach((like) => {
            if (like.clothes) {
                outfit.push(like);
            } else {
                clothing.push(like);
            }
        });

        let clothes = clothing.map((cloth) => {
            let clothUrl = `/clothing/${cloth._id}`;
            return (
                <li
                    key={cloth._id}
                    className="like-item"
                    onMouseLeave={this.updateLikes}
                >
                    <Link to={clothUrl}>
                        <div className="shadow"></div>
                        <img src={cloth.img_url} alt="" />
                        <h3>{cloth.name}</h3>
                    </Link>
                    <span
                        ref={this.heartRef}
                        dataid={cloth._id}
                        datatype="clothing"
                        onClick={this.toggleLike}
                        className="likes-page-heart material-icons"
                    >
                        favorite
                    </span>
                </li>
            );
        });

        let outfits = outfit.map((outfit) => {
            let outfitUrl = `/outfit/${outfit._id}`;
            let image;
            outfit.img_url === ""
                ? (image = defaultPic)
                : (image = outfit.img_url);
            return (
                <li key={outfit._id} className="like-item">
                    <Link to={outfitUrl} onMouseLeave={this.updateLikes}>
                        <div className="shadow"></div>
                        <img src={image} alt="" />
                        <h3>{outfit.name}</h3>
                    </Link>
                    <span
                        dataid={outfit._id}
                        datatype="outfits"
                        ref={this.heartRef}
                        onClick={this.toggleLike}
                        className="likes-page-heart material-icons"
                    >
                        favorite
                    </span>
                </li>
            );
        });

        let filtered;
        this.state.filter === "all"
            ? (filtered = outfits.concat(clothes))
            : this.state.filter === "clothing"
            ? (filtered = clothes)
            : (filtered = outfits);

        let numPages = Math.floor(1 + this.state.likes.length / 15);
        let pageSelects = [];
        for (let i = 0; i < numPages; i++) {
            let spanClass = "";
            if (i === this.state.currentPage) {
                spanClass = "selected";
            }
            pageSelects.push(
                <span className={spanClass} key={i} onClick={this.setPage(i)}>
                    {i + 1}
                </span>
            );
        }

        return (
            <div className="likes-wrapper">
                <div className="header-div">
                    <h1>Your Likes</h1>
                    <select
                        className="filters-bar"
                        name="filter"
                        id=""
                        defaultValue="all"
                        onChange={this.update}
                    >
                        <option value="all">All</option>
                        <option value="clothing">Clothing</option>
                        <option value="outfits">Outfits</option>
                    </select>
                </div>
                <div className="spacing"></div>

                <ul className="likes-list">{filtered}</ul>

                <div className="page-select">
                    <span
                        className="left"
                        onClick={this.setPage(this.state.currentPage - 1)}
                    >
                        &#9664;
                    </span>
                    {pageSelects}
                    <span
                        className="right"
                        onClick={this.setPage(this.state.currentPage + 1)}
                    >
                        &#9654;
                    </span>
                </div>
            </div>
        );
    }
}
