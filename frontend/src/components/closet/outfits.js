import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import defaultIcon from '../../assets/icons/defaultOutfitIcon.png'

import '../../styles/closet/clothing.css'

export default class Outfits extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 0,
            categoryFilter: "",
            tagFilter: "",
            tagText: "",
            tags: [],
            invalidTag: false,
            alreadyAdded: false,
            currentOutfits: [],
            isDragging: false
        }

        this.setPage = this.setPage.bind(this);
        this.getAllTags = this.getAllTags.bind(this);
        this.updateTagText = this.updateTagText.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.deleteTag = this.deleteTag.bind(this)
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this)
        this.updateItems = this.updateItems.bind(this)
    }
    
    componentDidMount() {
        this.updateItems();
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
        this.updateItems();
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
                this.updateItems();
            }
            
        }
    }


    setPage(val) {
        return (e) => {
            e.preventDefault();
            // let current = this.state.currentPage
            if (val > Math.floor(Object.values(this.props.outfits).length/15)) {
                return;
            } else if (val < 0) {
                return;
            }
            this.setState({
                currentPage: val
            })
            this.updateItems();
        }
    }

    getAllTags() {
        let allTags = [];
        Object.values(this.props.outfits).forEach(cloth => {
            cloth.tags.forEach(tag => {
                if (!allTags.includes(tag)) {
                    allTags.push(tag)
                }
            })
        })
        return allTags;
    }

    handleOnDragEnd(result) {
        if (!result.destination) return;

        if (result.destination.droppableId === "trash-can") {
            let current = this.state.currentOutfits;
            let movedId = current[result.source.index]._id;
            delete current[result.source.index];

            this.setState({
                currentOutfits: current,
                isDragging: false
            })
            this.props.deleteOutfit(movedId, this.props.currentUser.id);

        } else {

            let current = this.state.currentOutfits;
            let moved = current[result.source.index];
            delete current[result.source.index];
            current.splice(result.destination.index + 1, 0, moved);

            this.setState({
                currentOutfits: current,
                isDragging: false
            })
        }

        
    }

    updateItems() {
        let start = this.state.currentPage * 15;
        let end = this.state.currentPage * 15 + 15;

        let filteredOutfits = Object.values(this.props.outfits)
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
        .slice(start, end);
        
        this.setState({
            currentOutfits: filteredOutfits
        })
    }

    render() {
        
        
        let outfitElements = this.state.currentOutfits.map((outfit, i) => {
            let outfitUrl = `/outfit/${outfit._id}`;
            let outfitImgUrl = outfit.img_url == "" ? defaultIcon : outfit.img_url
            return (
                <Draggable key={i} draggableId={i.toString()} index={i}>
                    {(provided) => (
                        <li className="clothing-item" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <Link to={outfitUrl}>
                                <div className="shadow"></div>
                                <img src={outfitImgUrl} alt=""/>
                                <h3>{outfit.name}</h3>
                            </Link>
                        </li>
                    )}
                </Draggable>
            )
        })

        let numPages = Math.floor(1 + Object.values(this.props.outfits).length/15);
        let pageSelects = [];
        for (let i = 0; i < numPages; i++) {
            pageSelects.push(
                <span key={i} onClick={this.setPage(i)}>{i + 1}</span>
            )
        }

        let tagError = "";
        
        if (this.state.invalidTag) {
            tagError = "You do not have an outfit with that tag";
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

        let trashClass = this.state.isDragging ? "trashcan active" : "trashcan"

        return (
            <div className="clothing-wrapper">
                <div className="header-div">
                    <h1>Your Outfits</h1>
                    <div className="select-div">
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
                <DragDropContext onDragStart={() => this.setState({isDragging:true})} onDragEnd={this.handleOnDragEnd}>
                    <Droppable droppableId="trash-can">
                        {provided => (
                            <div className={trashClass} {...provided.droppableProps} ref={provided.innerRef}>
                                <div className="trash-holder"></div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="clothing-items">
                        {(provided) => (
                            <ul className="clothing-list" {...provided.droppableProps} ref={provided.innerRef}>
                                
                                {outfitElements}
                                
                                {provided.placeholder}
                            </ul>
                            
                        )}
                    </Droppable>
                    
                </DragDropContext>
                <div className="page-select">
                    <span className="left" onClick={this.setPage(this.state.currentPage + 1)}>&#9664;</span>
                    {pageSelects}
                    <span className="right" onClick={this.setPage(this.state.currentPage - 1)}>&#9654;</span>
                </div>
            </div>
        )
    }
}
