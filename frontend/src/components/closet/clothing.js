import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../styles/closet/clothing.css'

export default class Clothing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 0,
            categoryFilter: "",
            tagFilter: "",
        }

        this.setPage = this.setPage.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setTag = this.setTag.bind(this)
        this.getAllTags = this.getAllTags.bind(this);

        // this.timeoutFunc = setPage(this.state.currentPage + 1)
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

    setCategory(e) {
        e.preventDefault();
        this.setState({
            categoryFilter: e.currentTarget.value   
        })
    }

    setTag(e) {
        e.preventDefault();
        this.setState({
            tagFilter: e.currentTarget.value   
        })
    }

    getAllTags() {
        let allTags = [];
        Object.values(this.props.clothing).forEach(cloth => {
            cloth.tags.forEach(tag => {
                if (!allTags.includes(tag)) {
                    allTags.push(tag)
                }
            })
        })
        return allTags;
    }

    render() {
        let start = this.state.currentPage * 20;
        let end = this.state.currentPage * 20 + 20;
        
        let clothingElements = Object.values(this.props.clothing)
        .filter( cloth => cloth.category.includes(this.state.categoryFilter))
        .filter(cloth => {
            if (this.state.tagFilter === ""){
                return true;
            } else {
                return cloth.tags.includes(this.state.tagFilter)
            }
        })
        .slice(start, end).map((cloth, i) => {
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

        let allTags = this.getAllTags();
        let tagOptions = allTags.map(tag => {
            return (
                <option value={tag}>{tag}</option>
            )
        })
        
        return (
            <div className="clothing-wrapper">
                <div className="header-div">
                    <h1>Your Clothing</h1>
                    <div className="select-div">
                        <select 
                            name="category"
                            defaultValue=""
                            onChange={this.setCategory}
                            className="category-dropdown field"
                        >
                            <option value="">All Categories</option>
                            <option value="Top">Top</option>
                            <option value="Bottom">Bottom</option>
                            <option value="Dress">Dress</option>
                            <option value="Outerwear">Outerwear</option>
                            <option value="Undergarment">Undergarment</option>
                            <option value="Accessory">Accessory</option>
                            <option value="Shoes">Shoes</option>
                        </select>
                        <select 
                            name="tag"
                            defaultValue=""
                            onChange={this.setTag}
                            className="tag-dropdown field"
                        >
                            <option value="">All Tags</option>
                            {tagOptions}
                        </select>
                    </div>
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
