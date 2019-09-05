import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    //------------------- getting input fields value -------------
    handleChange(e) {
        //take value of inpiut fields and attach it as a property of the component:
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //------------------ handling login button ------------

    login(e) {
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                console.log(data.didMatch);
                if (data.didMatch) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(function(err) {
                console.log("err in POST /login", err);
            });
    }

    render() {
        return (
            <div className="welcome-fields">
                <input
                    name="email"
                    placeholder="email"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={e => this.handleChange(e)}
                />
                <Link className="login-link" to="/">Register?</Link>
                <button className="login-btn" onClick={e => this.login()}>Login</button>
                {this.state.error && (
                    <div className="error">
                        Something went wrong! Try again or register.
                    </div>
                )}
            </div>
        );
    }
}
