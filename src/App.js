import React from "react";
import Uploader from "./uploader";
import Avatar from "./avatar";
import axios from "./axios";
import Profile from "./profile";
import Bioeditor from "./bioeditor";
import OtherProfile from "./otherProfile";
import FindPeople from "./findPeople";
import Friends from "./friends";
import { Chat } from "./chat";
import { PrivateChat } from "./privateChat";
import { Route, BrowserRouter, Link } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
    }
    //componentDidMount will pass info to Avatar component
    async componentDidMount() {
        // console.log("mounted");
        try {
            const { data } = await axios.get("/user");
            // console.log("data", data);
            this.setState(data);
        } catch (err) {
            console.log("err in GET /user", err);
        }
    }

    render() {
        console.log("this.state", this.state);
        return (
            <div className="wraps-all">
                <BrowserRouter>
                    <header>
                        <h1 id="small-logo">Brief.me</h1>
                        <div className="nav-container">
                            <Link to={"/chat"} id="nav-link">
                                Chat
                            </Link>
                            <Link to={"/users"} id="nav-link">
                                Search
                            </Link>
                            <Link to={"/friends"} id="nav-link">
                                Friend requests
                            </Link>
                            <Link to={"/"} id="nav-link">
                                My profile
                            </Link>
                            <a id="nav-link" href="/logout">
                                Log out
                            </a>
                        </div>
                        <Avatar
                            image={this.state.image}
                            first={this.state.first}
                            last={this.state.last}
                            onClick={() =>
                                this.setState({
                                    uploaderIsVisible: true
                                })
                            }
                        />
                    </header>

                    <section>
                        <div>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        first={this.state.first}
                                        last={this.state.last}
                                        bio={this.state.bio}
                                        avatar={
                                            <Avatar
                                                id={this.state.id}
                                                first={this.state.first}
                                                last={this.state.last}
                                                image={this.state.image}
                                                onClick={() =>
                                                    this.setState({
                                                        uploaderIsVisible: true
                                                    })
                                                }
                                            />
                                        }
                                        bioeditor={
                                            <Bioeditor
                                                bio={this.state.bio}
                                                setBio={data =>
                                                    this.setState({
                                                        bio: data
                                                    })
                                                }
                                            />
                                        }
                                    />
                                )}
                            />
                            <Route
                                path="/user/:id"
                                render={props => (
                                    <OtherProfile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                            <Route
                                path="/users"
                                render={props => <FindPeople />}
                            />
                            <Route
                                path="/friends"
                                render={props => <Friends />}
                            />
                            <Route
                                exact
                                path="/chat"
                                render={props => <Chat />}
                            />
                            <Route
                                path="/chat/:id"
                                render={props => (
                                    <PrivateChat
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                        userId={this.state.id}
                                    />
                                )}
                            />
                        </div>

                        {this.state.uploaderIsVisible && (
                            <Uploader
                                setImg={data =>
                                    this.setState({
                                        image: data,
                                        uploaderIsVisible: false
                                    })
                                }
                                closeUploader={() =>
                                    this.setState({
                                        uploaderIsVisible: false
                                    })
                                }
                            />
                        )}
                    </section>
                </BrowserRouter>
            </div>
        );
    }
}

//
