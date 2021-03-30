import React from 'react';
import { getUserClothing } from '../../actions/clothing_actions';
import { newOutfit } from '../../actions/outfit_actions';

class NewOutfitForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: {id: "", username: "", email: ""},
            name: "",
            tags: [],
            description: "",
            img_url: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.currentUser().then(result => {
            this.setState({
                currentUser: result.data
            })
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.newOutfit(this.state).then((outfit) => console.log(outfit))
    }

    update(type) {
        return (e) =>
        this.setState({
            [type]: e.currentTarget.value,
        });
    }

    render() {
        return (
            <div>
                
                <form onSubmit={this.handleSubmit}>
                    <div>

                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.update("name")}
                            placeholder="Outfit Name"
                            className="new-outfit-name"
                        />
                        <input
                            type="text"
                            className="new-outfit-tags"
                            value={this.state.tags}
                            onChange={this.update("tags")}
                            placeholder="#tag"
                        />
                        <textarea
                            className="new-outfit-description"
                            value={this.state.description}
                            onChange={this.update("description")}
                            placeholder="Description"
                        />
                        <button>Create Outfit</button>
                    </div>
                </form>
            </div>
        )
    }

}

export default NewOutfitForm;