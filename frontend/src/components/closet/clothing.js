import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../styles/closet/clothing.css'

export default class Clothing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 0
        }

        this.setPage = this.setPage.bind(this)
    }

    setPage(val) {
        return (e) => {
            e.preventDefault();
            // let current = this.state.currentPage
            if (val > Math.floor(Object.values(this.props.clothing).length/20)) {
                return;
            } else if (val < 0) {
                return;
            }
            this.setState({
                currentPage: val
            })
        }
    }

    render() {
        let start = this.state.currentPage * 20;
        let end = this.state.currentPage * 20 + 20;
        let clothingElements = Object.values(this.props.clothing).slice(start, end).map((cloth, i) => {
            let clothUrl = `/clothing/${cloth._id}`;
            return (
                <div className="clothing-item" key={i}>
                    <Link to={clothUrl}>
                        <div className="shadow"></div>
                        <img src={cloth.img_url} alt=""/>
                        <h3>{cloth.name}</h3>
                    </Link>
                </div>
            )
        })

        let numPages = Math.floor(1 + Object.values(this.props.clothing).length/20);
        let pageSelects = [];
        for (let i = 0; i < numPages; i++) {
            pageSelects.push(
                <span key={i} onClick={this.setPage(i)}>{i + 1}</span>
            )
        }

        return (
            <div className="clothing-wrapper">
                <div className="header-div">
                    <h1>Your Clothing</h1>
                </div>
                
                <div className="clothing-list">
                    {clothingElements}
                </div>
                <div className="page-select">
                    <span className="left" onClick={this.setPage(this.state.currentPage + 1)}>&#9664;</span>
                    {pageSelects}
                    <span className="right" onClick={this.setPage(this.state.currentPage - 1)}>&#9654;</span>
                </div>
            </div>
        )
    }
}
