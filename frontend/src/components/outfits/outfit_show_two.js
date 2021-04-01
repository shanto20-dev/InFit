import React, { Component } from 'react'
import "../../styles/outfits/outfit_edit.css"
import ClothingItem from '../clothing/clothing_item';

export default class OutfitShowTwo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            renderClothes: false,
            newClothes: [],
        };

        this.renderMyClothes = this.renderMyClothes.bind(this);
        // this.handleSave = this.handleSave.bind(this);
        // this.handleModal = this.handleModal.bind(this);
    }

    componentDidMount(){
        this.props.getOutfit(this.props.match.params.id);
        this.props.currentUser().then((result) => {
            let thisUser = result.data;
            this.setState({
                currentUser: thisUser
            });
            this.props.getUserClothing(thisUser.id).then(() => {
                this.setState({
                    currentUserClothes: this.props.clothes
                })
            });
        })
    }

    renderMyClothes(){
        if (this.state.currentUserClothes){
            this.state.currentUserClothes.map( (clothes, idx) => {
                return (
                <>
                    <div>Here are the clothes yo</div>
                    <ClothingItem clothingId={clothes.id} key={idx}/>
                </>

                )
            })
        }else{
            return <div>No render</div>
        }
    }


    render() {
        console.log(this.state)
        let myClothes = this.renderMyClothes();
        return (
            <div className="outfit-edit-container">
                <div className="my-clothes-container">
                    <div className= "my-clothes-grid">
                        {myClothes}
                    </div>


                </div>
                <div className="my-outfit-container">



                </div>
                
            </div>
        )
    }
}
