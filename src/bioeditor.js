import React from "react";
import axios from "./axios";

export default class Bioeditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
        this.clickedEdit = this.clickedEdit.bind(this);
    }

    //------------------- getting textarea value ------------------
    handleChange(e) {
        //take value of inpiut fields and attach it as a property of the component:
        // console.log("e", e.target);
        this.bio = e.target.value;
        // this.setState({
        //     [e.target.name]: e.target.value
        // });
    }
    //------------------- clicked save bio -----------------------
    async submit() {
        console.log("state", this.state);
        try {
            const { data } = await axios.post("/bio", {
                draftBio: this.bio
            });
            console.log("data", data);
            // if (!data) {
            //     this.props.setBio(this.props.bio);
            //     this.setState({
            //         editing: false
            //     });
            // }

            this.props.setBio(data);
            this.setState({
                editing: false
            });
        } catch (err) {
            console.log("err in POST /bio", err);
        }
    }

    clickedEdit() {
        if (!this.bio) {
            this.bio = this.props.bio;
        }
        this.setState({
            editing: true
        });
    }

    render() {
        return (
            <div>
                {this.props.bio && !this.state.editing && (
                    <div>
                        <p className="bio-text">{this.props.bio}</p>
                        <button className="bio-btn" onClick={this.clickedEdit}>
                            Edit bio
                        </button>
                    </div>
                )}

                {this.state.editing && (
                    <div className="text-area">
                        <textarea
                            defaultValue={this.props.bio}
                            name="draftBio"
                            onChange={e => this.handleChange(e)}
                        />
                        <div>
                            <button
                                className="bio-btn"
                                onClick={e => this.submit()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
                {!this.props.bio && !this.state.editing && (
                    <button
                        className="bio-btn"
                        onClick={e =>
                            this.setState({
                                editing: true
                            })
                        }
                    >
                        Add your bio
                    </button>
                )}
            </div>
        );
    }
}
