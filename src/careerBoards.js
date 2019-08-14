import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function CareerBoards(props) {
    const [path, setPath] = useState();
    // console.log("path", path);

    function submit(e) {
        console.log("clicked the board");
        // console.log("e", e.target.textContent.toLowerCase());
        // setPath(e.target.textContent.toLowerCase());
        // if (path) {
        //     props.history.push(`/career/${path}`);
        // }
    }

    return (
        <div className="boards-container">
            <Link to={"/career/code"} id="nav-link">
                <div className="board">
                    <h3>Web Development</h3>
                </div>
            </Link>
            <Link to={"/career/design"} id="nav-link">
                <div className="board">
                    <h3>Web Design</h3>
                </div>
            </Link>
            <Link to={"/career/datascience"} id="nav-link">
                <div className="board">
                    <p>Data Science</p>
                </div>
            </Link>
            <Link to={"/career/marketing"} id="nav-link">
                <div className="board">
                    <p>Digital Marketing</p>
                </div>
            </Link>
            <Link to={"/career/smm"} id="nav-link">
                <div className="board">
                    <p>Social Media Management</p>
                </div>
            </Link>
            <Link to={"/career/product"} id="nav-link">
                <div className="board">
                    <p>Product Management</p>
                </div>
            </Link>
        </div>
    );
}
