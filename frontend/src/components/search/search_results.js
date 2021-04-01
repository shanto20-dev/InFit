import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/search/search_results.css";

export default class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.detailsRef = [];
        this.cardRef = [];
        this.state = { filter: "all" };

        this.update = this.update.bind(this);
    }

    update(e) {
        this.setState({ filter: e.target.value });
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
                    {filtered.map((result, idx) => {
                        let link;
                        if (result.clothes) {
                            link = `/outfit/${result._id}`;
                        } else {
                            link = `clothing/${result._id}`;
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
                                        src={result.img_url}
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
            </div>
        );
    }
}
