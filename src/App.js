import React from "react";
import Uploader from "./uploader";
import Avatar from "./avatar";
import axios from "./axios";
import Profile from "./profile";
import Bioeditor from "./bioeditor";
import OtherProfile from "./otherProfile";
import CareerBoards from "./careerBoards";
import CareerPath from "./careerPath";
import Offer from "./offer";
import { PrivateChat } from "./privateChat";
import { Route, BrowserRouter, Link } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
    }

    async componentDidMount() {
        try {
            const { data } = await axios.get("/user");
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
                    <div className="myLogo">
                    <img className="myLogoImg" src="/mylogo.png" />
                    </div>
                        <div className="nav-container">
                        {this.state.role == "student" && <Link to={"/careers"} id="nav-link">
                            Careers
                        </Link>}

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
                                        id={this.state.id}
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
                                        offer={
                                            <Offer
                                                offer={this.state.offer}
                                                setOffer={data =>
                                                    this.setState({
                                                        offer: data
                                                    })
                                                }
                                            />
                                        }
                                    />
                                )}
                            />
                            <Route
                                path="/careers"
                                render={props => (
                                    <CareerBoards
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                            <Route
                                path="/career/:path"
                                render={props => (
                                    <CareerPath
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
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
