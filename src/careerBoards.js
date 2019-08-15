import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function CareerBoards(props) {
    const [path, setPath] = useState();
    // console.log("path", path);

    // function submit(e) {
    //     console.log("clicked the board");
    //     // console.log("e", e.target.textContent.toLowerCase());
    //     // setPath(e.target.textContent.toLowerCase());
    //     // if (path) {
    //     //     props.history.push(`/career/${path}`);
    //     // }
    // }

    return (
        <div className="boards-container">
        <img className="blob1" src="blob1.svg" />
        <img className="blob2" src="blob2.svg" />
        <div className="boards-inner-container">
            <Link to={"/career/code"} className="career-board">
                <div className="board">
                    <p className="board-p">Web Development</p>
                </div>
            </Link>
            <Link to={"/career/design"} className="career-board">
                <div className="board">
                    <p className="board-p">Web Design</p>
                </div>
            </Link>
            <Link to={"/career/datascience"} className="career-board">
                <div className="board">
                    <p className="board-p">Data Science</p>
                </div>
            </Link>
            <Link to={"/career/marketing"} className="career-board">
                <div className="board">
                    <p className="board-p">Digital Marketing</p>
                </div>
            </Link>
            <Link to={"/career/smm"} className="career-board">
                <div className="board">
                    <p className="board-p">Social Media Management</p>
                </div>
            </Link>
            <Link to={"/career/product"} className="career-board">
                <div className="board">
                    <p className="board-p">Product Management</p>
                </div>
            </Link>
            </div>
        </div>
    );
}
