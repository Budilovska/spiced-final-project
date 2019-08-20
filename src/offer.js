import React from "react";
import axios from "./axios";

export default class Offer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
        this.clickedEdit = this.clickedEdit.bind(this);
    }

    //------------------- getting textarea value ------------------
    handleChange(e) {
        this.offer = e.target.value;
    }
    //------------------- clicked save bio -----------------------
    async submit() {
        console.log("state", this.state);
        try {
            const { data } = await axios.post("/offer", {
                draftOffer: this.offer
            });
            this.props.setOffer(data);
            this.setState({
                editing: false
            });
        } catch (err) {
            console.log("err in POST /bio", err);
        }
    }

    clickedEdit() {
        if (!this.offer) {
            this.offer = this.props.offer;
        }
        this.setState({
            editing: true
        });
    }

    render() {
        return (
            <div>
                {this.props.offer && !this.state.editing && (
                    <div>
                        <p className="offer-text">
                            {this.props.offer}
                        </p>
                        <button
                            className="offer-btn"
                            onClick={this.clickedEdit}
                        >
                            Add another offer
                        </button>
                    </div>
                )}

                {this.state.editing && (
                    <div className="text-area">
                        <textarea className="addoffer-text"
                            name="draftOffer"
                            onChange={e => this.handleChange(e)}
                        />
                        <div>
                            <button
                                className="offer-btn"
                                onClick={e => this.submit()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
                {!this.props.offer && !this.state.editing && (
                    <button
                        className="offer-btn"
                        onClick={e =>
                            this.setState({
                                editing: true
                            })
                        }
                    >
                        Add offer
                    </button>
                )}
            </div>
        );
    }
}
