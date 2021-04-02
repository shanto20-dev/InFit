import React from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import ClothingItem from "../clothing/clothing_item";
import "../../styles/outfits/outfit_show.css";

import defaultPic from '../../assets/icons/defaultOutfitIcon.png'

class OutfitShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderClothes: false,
      newClothes: [],
      currentUser: {id: 1},
      outfit: {
        id:"",
        tags:[],
        name: "",
        user: "",
        img_url: "",
        description: "",
        clothes: []
      },
      tagText: "",
      isDragging: false,
      currentUserClothes: []
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.update = this.update.bind(this);
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this)
  }

  componentDidMount() {
    this.props.getOutfit(this.props.match.params.id).then(action => {
      this.setState({
        outfit: action.outfit
      })
    })
    this.props.currentUser().then((result) => {
      let thisUser = result.data;
      this.setState({
        currentUser: thisUser,
      });
      this.props.getUserClothing(thisUser.id).then(() => {
        this.setState({
            currentUserClothes: this.props.clothes
        })
    });
  })}

  addToOutfit(id) {
    if (
      !this.state.newClothes.includes(id) &&
      !this.props.outfit.clothes.includes(id)
    )
      this.setState({
        newClothes: [
          ...this.state.newClothes,
          id,
        ],
      });
  }

  handleModal(){
    document.getElementById("modal").classList.toggle("active")
    if (!document.getElementById("modal").classList.contains("active")){
      document.getElementById("modal").classList.add("inactive")
    }
    setTimeout(() => {
      document.getElementById("modal").classList.remove("inactive")
      this.setState({ renderClothes: !this.state.renderClothes })
    }, 100)
  }

  handleSave() {
    if (document.getElementById("modal").classList.contains("active")){
      document.getElementById("modal").classList.remove("active")
      document.getElementById("modal").classList.add("inactive")
          setTimeout(() => {
      document.getElementById("modal").classList.remove("inactive")
      this.setState({ renderClothes: !this.state.renderClothes })
    }, 100)
    }
    console.log([...this.state.outfit.clothes])
    this.props.updateOutfit({
      id: this.props.match.params.id,
      clothes: [...this.state.outfit.clothes],
    });

    this.setState({newClothes: []})
  
    // this.setState({ renderClothes: false });
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
    if (this.state.outfit.tags.includes("#" + this.state.tagText)) return;
    let current = this.state.outfit;
    current.tags.push("#" + this.state.tagText);
    this.setState({
      outfit: current,
      tagText: ""
    })
  }

  removeTag(e) {
    e.preventDefault();
    let current = this.state.outfit;
    current.tags.splice(e.currentTarget.id, 1)
    this.setState({
      outfit: current
    })
  }

  handleOnDragEnd(result) {
    if (!result.destination) return;
    console.log(result)
    if (result.destination.droppableId === "all-clothes") {
      if (result.source.droppableId === "outfit-clothes") {
        let current = Object.assign({},this.state.outfit);
        
        let filteredClothes = this.state.currentUserClothes.filter(cloth => {
          return this.state.outfit.clothes.includes(cloth._id)
        });

        let newClothes = current.clothes.filter(clothId => {
          return clothId != filteredClothes[result.source.index]._id;
        })
        console.log(newClothes)
        current.clothes = newClothes
        this.setState({
          outfit: current,
          isDragging: false,
        })
      }
    } else if (result.destination.droppableId === "outfit-clothes") {
      if (result.source.droppableId === "all-clothes") {
        let current = this.state.currentUserClothes.filter(cloth => {
          return !this.state.outfit.clothes.includes(cloth._id)
        })

        let removed = current[result.source.index - this.state.outfit.clothes.length];
        let currentOutfit = Object.assign({}, this.state.outfit);
        currentOutfit.clothes.push(removed._id)

        this.setState({
          isDragging: false,
          outfit: currentOutfit
        })
      }
    }
  }

  render() {
    console.log(this.state.currentUserClothes.filter((cloth) =>{
      return this.state.outfit.clothes.includes(cloth._id)
    }))

    const mappedItems = this.state.currentUserClothes
    .filter((cloth) =>{
      return this.state.outfit.clothes.includes(cloth._id)
    })
    .map((cloth, i) => {
      let clothUrl = `/clothing/${cloth._id}`;
      return (
        <Draggable key={i} draggableId={i.toString()} index={i}>
          {(provided) => (
            <div className="clothing-item" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              <Link to={clothUrl}>
                <div className="shadow"></div>
                <img src={cloth.img_url} alt="" />
                <h3>{cloth.name}</h3>
              </Link>
            </div>
          )}
        </Draggable>
      );
    })
      

    let clothingElements;
    if (this.state.currentUserClothes && this.state.renderClothes) {
      clothingElements = Object.values(this.state.currentUserClothes)
      .filter(cloth => {
        return !this.state.outfit.clothes.includes(cloth._id)
      })
      .map((cloth, i) => {
        let idx = i + mappedItems.length;
        return (
          <Draggable key={idx} draggableId={idx.toString()} index={idx}>
            {provided => (
              <div
                onClick={() => this.addToOutfit(cloth._id)}
                className="clothing-item"
                {...provided.draggableProps}
                {...provided.dragHandleProps} 
                ref={provided.innerRef}
              >
                <Link to="#">
                  <div className="shadow" ></div>
                  <img src={cloth.img_url} alt="" />
                  <h3>{cloth.name}</h3>
                </Link>
              </div>
            )}
          </Draggable>
        );
      });
    }

    let tagsDisplay = "";
    let tagInput = ""
    let addButton = "";
    let saveButton = "";

    if ( this.state.currentUser.id == this.state.outfit.user ) {
      tagsDisplay = (
        <div className="current-tags">
          {this.state.outfit.tags.map((tag, i) => {
            return (
              <span key={i} className="tag">{tag}<span className="delete-tag" id={i} onClick={this.removeTag}>X</span></span>
            )
          })}
        </div>
      )
      tagInput = (
        <div className = "tags-div">
          <input
            type="text"
            className="new-clothing-tags field"
            value={this.state.tagText}
            onChange={this.update("tagText")}
            placeholder="#tag"
          />
          <span className="add-tag" onClick={this.addTag}>+</span>
        </div>
      );
      addButton = <button className="addButton" onClick={() => this.handleModal()}>Add clothes to this outfit</button>
      saveButton = <button onClick={this.handleSave}>Save Outfit</button>
    } else {
      tagsDisplay = (
        <div className="current-tags">
          {this.state.outfit.tags.map((tag, i) => {
            return (
              <span key={i} className="tag">{tag}</span>
            )
          })}
        </div>
      )
    }
    

    let imgUrl = this.state.outfit.img_url == "" ? defaultPic : this.state.outfit.img_url;

    return (
        <div className="outfit-show-container">
          <DragDropContext onDragStart={() => this.setState({isDragging:true})} onDragEnd={this.handleOnDragEnd}>
            
                <div className="outfit-info">
                  <h1 className="outfit-title">{this.state.outfit.name}</h1>
                  <h1 className="outfit-description">
                    {this.state.outfit.description}
                  </h1>
                  {tagInput}
                  {tagsDisplay}
                  <img src={imgUrl} className="outfit-image"></img>

                  {addButton}

                  {saveButton}
                </div>
              
            

            <div className="modal" id="modal">
              <h1 className="modal-header">Add clothes to your outfit</h1>
              <Droppable droppableId="all-clothes">
                {provided => (
                  <div className="clothing-elements" {...provided.droppableProps} ref={provided.innerRef}>
                    {clothingElements}
                  </div>
                )}
              </Droppable>
            </div>
            <Droppable droppableId="outfit-clothes">
              {provided => (
                <div className="outfit-clothes" {...provided.droppableProps} ref={provided.innerRef}>
                  {mappedItems}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      
    );
  }
}

export default OutfitShow;
