import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class Welcome extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <HashRouter>
                <div className="welcome">
                <h1 className="brief-me">Brief.me</h1>
                <h2 id="welcome-h2">We are a community of film and advertising peers</h2>
                <p id="welcome-p">Share your project, find crew members, land a job, brainstorm together, create</p>
                <div className="welcome-container">
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                    </div>
                </div>
            </HashRouter>
        );
    }
}
