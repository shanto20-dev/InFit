import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/search/search_results.css";
import defaultPic from "../../assets/icons/defaultOutfitIcon.png";

export default class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.detailsRef = [];
        this.cardRef = [];
        this.state = { filter: "all", currentPage: 0, numPages: 0 };

        this.update = this.update.bind(this);
        this.setPage = this.setPage.bind(this);
    }

    update(e) {
        this.setState({
            filter: e.target.value,
            currentPage: 0,
        });
    }

    componentDidMount() {
        let filtered;
        this.state.filter === "all"
            ? (filtered = this.props.searchResults)
            : this.state.filter === "clothing"
            ? (filtered = this.props.searchResults.filter(
                  (result) => !result.clothes
              ))
            : (filtered = this.props.searchResults.filter(
                  (result) => result.clothes
              ));
        this.setState({ numPages: Math.floor(filtered.length / 16) + 1 });
    }

    setPage(val) {
        return (e) => {
            e.preventDefault();
            // let current = this.state.currentPage

            if (val < 0) {
                return;
            }
            this.setState({
                currentPage: val,
            });
        };
    }

    render() {
        let filtered;
        this.state.filter === "all"
            ? (filtered = this.props.searchResults)
            : this.state.filter === "clothing"
            ? (filtered = this.props.searchResults.filter(
                  (result) => !result.clothes
              ))
            : (filtered = this.props.searchResults.filter(
                  (result) => result.clothes
              ));
        let start = this.state.currentPage * 16;
        let end = this.state.currentPage * 16 + 16;
        let divided = filtered.slice(start, end);

        let numPages = Math.floor(1 + filtered.length / 16);
        let pageSelects = [];
        for (let i = 0; i < numPages; i++) {
            pageSelects.push(
                <span key={i} onClick={this.setPage(i)}>
                    {i + 1}
                </span>
            );
        }
        let nextPage =
            this.state.currentPage + 1 === pageSelects.length
                ? this.state.currentPage
                : this.state.currentPage + 1;
        console.log(filtered.length);
        return (
            <div>
                <div className="filters-bar-container">
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
                <div className="search-results-container">
                    {divided.map((result, idx) => {
                        let link;
                        if (result.clothes) {
                            link = `/outfit/${result._id}`;
                        } else {
                            link = `clothing/${result._id}`;
                        }
                        let imgUrl = "";
                        if (result.img_url == "") {
                            imgUrl = defaultPic;
                        } else {
                            imgUrl = result.img_url;
                        }
                        return (
                            <Link
                                className="link"
                                key={idx}
                                ref={(card) => (this.cardRef[idx] = card)}
                                to={link}
                            >
                                <div
                                    onMouseEnter={() => {
                                        this.detailsRef[idx].classList.remove(
                                            "hidden"
                                        );
                                    }}
                                    onMouseLeave={() => {
                                        this.detailsRef[idx].classList.add(
                                            "hidden"
                                        );
                                    }}
                                    className="search-result-card"
                                >
                                    <img
                                        className="search-result-img"
                                        src={imgUrl}
                                    />
                                    <div className="overlay"></div>
                                    <div
                                        ref={(details) =>
                                            (this.detailsRef[idx] = details)
                                        }
                                        className="details hidden"
                                    >
                                        <h1 className="search-result-name">
                                            {result.name}
                                        </h1>

                                        <h1 className="search-result-category">
                                            {result.category}
                                        </h1>

                                        <h1 className="search-result-tags">
                                            {result.tags.map((tag, idx) => {
                                                return (
                                                    <span key={idx}>
                                                        {tag}{" "}
                                                    </span>
                                                );
                                            })}
                                        </h1>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="page-select">
                    <span
                        className="left"
                        onClick={this.setPage(this.state.currentPage - 1)}
                    >
                        &#9664;
                    </span>
                    {pageSelects}
                    <span className="right" onClick={this.setPage(nextPage)}>
                        &#9654;
                    </span>
                </div>
            </div>
        );
    }
}
