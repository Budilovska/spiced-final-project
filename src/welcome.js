import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class Welcome extends React.Component {
    constructor() {
        super();
    }

    submit(e) {
        console.log("clicked");
    }
    render() {
        return (
            <HashRouter>
            <div>
            <div className="login-box">
                <div>
                            <Route exact path="/" component={Registration} />
                            <Route path="/login" component={Login} />
                        </div>
            </div>
                <div className="welcome">
                <h1 className="young-pros">Young <br /> Pros</h1>
                <h2 className="young-pros-desc">Tech career explorer <br />for high school students</h2>

                    <div className="bubbles-container">
                    <div className="intro_layers" />
                    <div className="intro_layers2" />
                    <div className="intro_layers3" />
                    </div>

                </div>
                </div>
            </HashRouter>
        );
    }
}
