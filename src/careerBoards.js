import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function CareerBoards(props) {
    const [path, setPath] = useState();
    console.log("path", path);

    function submit(e) {
        console.log("clicked the board");
        console.log("e", e.target.textContent.toLowerCase());
        setPath(e.target.textContent.toLowerCase());
        if (path) {
            props.history.push(`/career/${path}`);
        }
    }

    return (
        <div className="boards-container">
            <div className="board" onClick={submit}>
                <p>Code</p>
            </div>

            <div className="board" onClick={submit}>
                <p>Design</p>
            </div>
            <Link to={"/career/film"} id="nav-link">
                <div className="board" onClick={submit}>
                    <p>Film</p>
                    <p>Some info about this profession</p>
                </div>
            </Link>
            <Link to={"/career/marketing"} id="nav-link">
                <div className="board" onClick={submit}>
                    <p>Marketing</p>
                    <p>Some info about this profession</p>
                </div>
            </Link>
            <Link to={"/career/photography"} id="nav-link">
                <div className="board" onClick={submit}>
                    <p>Photography</p>
                    <p>Some info about this profession</p>
                </div>
            </Link>
            <Link to={"/career/management"} id="nav-link">
                <div className="board" onClick={submit}>
                    <p>Management</p>
                    <p>Some info about this profession</p>
                </div>
            </Link>
        </div>
    );
}
