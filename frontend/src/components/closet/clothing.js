import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


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
            alreadyAdded: false,
            currentClothes: [],
            isDragging: false,
        }

        this.setPage = this.setPage.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.getAllTags = this.getAllTags.bind(this);
        this.updateTagText = this.updateTagText.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.deleteTag = this.deleteTag.bind(this)
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this)
        this.updateItems = this.updateItems.bind(this)
    }
    
    componentDidMount() {
        this.props.getUserClothing(this.props.currentUser.id).then(() => {
            this.updateItems();
        })
        

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
        current.splice(e.currentTarget.id, 1)
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
            if (val > Math.floor(Object.values(this.props.clothing).length/15)) {
                return;
            } else if (val < 0) {
                return;
            }
            this.setState({
                currentPage: val
            }, () => {
                this.updateItems();
            })
            
        }
    }

    setCategory(e) {
        e.preventDefault();
        this.setState({
            categoryFilter: e.currentTarget.value   
        }, () => {
            this.updateItems();
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

    handleOnDragEnd(result) {
        if (!result.destination) return;

        if (result.destination.droppableId === "trash-can") {

            let current = this.state.currentClothes;
            let movedId = current[result.source.index]._id;
            delete current[result.source.index];

            this.setState({
                currentClothes: current,
                isDragging: false
            })
            this.props.deleteClothing(movedId, this.props.currentUser.id).then(() => {
                this.getUserClothing(this.props.currentUser.id)
            })
            
        } else {

            let current = this.state.currentClothes;
            let moved = current[result.source.index];
            delete current[result.source.index];
            current.splice(result.destination.index + 1, 0, moved);

            this.setState({
                currentClothes: current,
                isDragging: false
            })
        }

        
    }

    updateItems() {
        let start = this.state.currentPage * 15;
        let end = this.state.currentPage * 15 + 15;

        let filteredClothing = Object.values(this.props.clothing)
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
        .slice(start, end);

        this.setState({
            currentClothes: filteredClothing
        })
    }

    render() {
        
        
        let clothingElements = this.state.currentClothes.map((cloth, i) => {
            let clothUrl = `/clothing/${cloth._id}`;
            return (
                <Draggable key={i} draggableId={i.toString()} index={i}>
                    {(provided) => (
                        <li className="clothing-item" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <Link to={clothUrl}>
                                <div className="shadow"></div>
                                <img src={cloth.img_url} alt=""/>
                                <h3>{cloth.name}</h3>
                            </Link>
                        </li>
                    )}
                </Draggable>
            )
        })

        let numPages = Math.floor(1 + Object.values(this.props.clothing).length/15);
        let pageSelects = [];
        for (let i = 0; i < numPages; i++) {
            let spanClass = ""
            if (i === this.state.currentPage) {
                spanClass = "selected"
            }
            pageSelects.push(
                <span className={spanClass} key={i} onClick={this.setPage(i)}>{i + 1}</span>
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

        let trashClass = this.state.isDragging ? "trashcan active" : "trashcan"

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
                                
                                {clothingElements}
                                
                                {provided.placeholder}
                            </ul>
                            
                        )}
                    </Droppable>
                    
                </DragDropContext>
                <div className="page-select">
                    <span className="left" onClick={this.setPage(this.state.currentPage - 1)}>&#9664;</span>
                    {pageSelects}
                    <span className="right" onClick={this.setPage(this.state.currentPage + 1)}>&#9654;</span>
                </div>
            </div>
        )
    }
}
