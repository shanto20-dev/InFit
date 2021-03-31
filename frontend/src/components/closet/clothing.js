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
            tagText: "",
            tags: [],
            invalidTag: false,
            alreadyAdded: false
        }

        this.setPage = this.setPage.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setTag = this.setTag.bind(this)
        this.getAllTags = this.getAllTags.bind(this);
        this.updateTagText = this.updateTagText.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.deleteTag = this.deleteTag.bind(this)

    }

    updateTagText(e) {
        e.preventDefault();
        this.setState({
            tagText: e.currentTarget.value
        })
    }

    deleteTag(e) {
        e.preventDefault();
        let current = this.state.tags;
        delete current[e.currentTarget.id];
        this.setState({
            tags: current
        })
    }

    handleKeyPress(e){
        if (e.keyCode === 13) {
            e.preventDefault();
            let allTags = this.getAllTags();
            if (!allTags.includes('#' + e.currentTarget.value)){
                this.setState({
                    invalidTag: true,
                    tagText: ""
                })
            } else if (this.state.tags.includes('#' + e.currentTarget.value)) {
                this.setState({
                    alreadyAdded: true
                })
            } else {
                
                let current = this.state.tags;
                current.push('#' + e.currentTarget.value)
                this.setState({
                    tags: current,
                    tagText: "",
                    invalidTag: false,
                    alreadyAdded: false
                })
            }
            
        }
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
            if (this.state.tags === []){
                return true;
            } else {
                let isGood = true;
                this.state.tags.forEach(tag => {
                    if (!cloth.tags.includes(tag)) {
                        isGood = false;
                    }
                })
                return isGood;
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

        let tagError = "";
        
        if (this.state.invalidTag) {
            tagError = "You do not have a clothing item with that tag";
        } else if (this.state.alreadyAdded) {
            tagError = "You have already added this tag"
        }
        let tagElements = this.state.tags.map((tag, i) => {
            return (
                <span className="tag" id={i} key={i}>
                    {tag}
                    <span className="delete-tag" id={i} onClick={this.deleteTag}>X</span>
                </span>
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
                        <div className="tag-input-wrapper">
                            <label>{tagError}</label>
                            <input 
                                type="text" 
                                value={this.state.tagText}
                                placeholder="Add Tag" 
                                onChange={this.updateTagText} 
                                onKeyDown={this.handleKeyPress}
                            />
                        </div>
                    </div>
                </div>
                <div className="current-tags">
                    {tagElements}
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
