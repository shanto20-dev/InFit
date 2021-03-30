import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import uploadClothesIcon from '../../assets/icons/uploadClothes.png'

import '../../styles/closet/closet.css'

export default class Closet extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: {id:"", username: "", email: ""}
        }
    }

    componentDidMount() {
        this.props.currentUser().then(result => {
            this.setState({
                currentUser: result.data
            })
        })
    }
    
    render() {
        console.log(this.state.currentUser)
        // console.log(this.props.currentUser())
        return (
            <div className="closet-wrapper">
                <div className="sidebar">

                </div>
                <div className="content">
                    <div className="upload-clothes-wrapper">
                        <Link to="/clothing/new"><span>Add Clothing</span><img src={uploadClothesIcon} alt=""/></Link>
                    </div>
                </div>
            </div>
        )
    }
}
