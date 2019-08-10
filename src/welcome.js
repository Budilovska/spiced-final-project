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
                    <h1>Logo</h1>

                    <div className="intro_layers" />

                    <h2 id="welcome-h2">Pick your career path</h2>
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
