import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom"; //this is for making links to our router

export default class Registration extends React.Component {
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
        // console.log("this.state", this.state);
    }
    //------------------ handling submit registration ------------

    submit(e) {
        axios
            .post("/welcome/", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password,
                role: this.state.role
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                    //user is now logged in, added cookie with userId
                } else {
                    this.setState({
                        error: true
                    });
                }
                // console.log("data", data.success);
            })
            .catch(function(err) {
                console.log("err in POST /welcome", err);
            });
    }

    render() {
        return (
            <div className="welcome-fields">
                <div className="buttons">
                    <p className="fake-link">Register</p>
                    <Link className="login-link" to="/login">
                        Log in
                    </Link>
                </div>
                {this.state.error && <div className="error">Ooops!</div>}
                <input
                    name="first"
                    placeholder="first"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="last"
                    placeholder="last"
                    onChange={e => this.handleChange(e)}
                />
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
                <select
                    name="role"
                    type="role"
                    onChange={e => this.handleChange(e)}
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
                <button className="login-btn" onClick={e => this.submit()}>
                    Go!
                </button>
            </div>
        );
    }
}

// <Link to="/login">Log in</Link>
