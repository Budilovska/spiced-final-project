import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "./actions";
import Courses from "./courses";
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor'

configureAnchors({offset: -60, scrollDuration: 200});

export default function CareerPath(props) {
    const dispatch = useDispatch();
    const [teacher, setTeacher] = useState();
    const [careerPath, setPath] = useState();
    // console.log("path", careerPath);

    const button = useSelector(state => state.button);
    const favorites = useSelector(state => state.favorites);
    // console.log("button", button);

    useEffect(() => {
        (async () => {
            try {
                const path = props.match.params.path;
                const { data } = await axios.get(`/career/${path}.json`);
                setTeacher(data);
                setPath(data[0].careerpath);
            } catch (err) {
                console.log("err in GET /career/:path", err);
            }
        })();
    }, []);

    return (
        <div className="careerpath-container">
            <img className="blob3" src="/blob3.svg" />
            <div className="career-description">

                {careerPath == "code" && (
                    <div className="path-description">
                    <h2 className="path-title">What is a web developer?</h2>
                        <p className="path-p">
                            There are more than 1.25 billion websites online with thousands more added each day. Web developers are the individuals responsible for making that happen. They take a static visual design and turn it into a working, online website which people can visit and interact with. <br /> <br />This path begins with the basics of HTML but progresses quickly through CSS, JavaScript, and React so that you can go from no-code to full-stack at your own pace.
                        </p>
                        <div className="list">
                            <p className="list-p"> &#10004; HTML & CSS</p>
                            <p className="list-p"> &#10004; Javascript</p>
                            <p className="list-p"> &#10004; Git</p>
                            <p className="list-p"> &#10004; Command Line</p>
                            <p className="list-p"> &#10004; SQL and Databases</p>
                            <p className="list-p"> &#10004; API</p>
                        </div>
                    </div>
                )}

                {careerPath == "design" && (
                    <div className="path-description">
                    <h2 className="path-title">What is a web designer?</h2>
                        <p className="path-p">
                        A web designer's main job is to design web pages. There is a lot to consider in the design of websites which may not be immediately apparent when looking at a webpage for the first time. <br /> <br />

                        The aesthetic aspect is an important one and selecting the appropriate colors, font, layout and images creates the whole personality of the website. In addition to considering aesthetic aspects, the usability of the website has to be a priority. It is important to create a page that the target market can relate to.

                        </p>
                        <div className="list">
                            <p className="list-p"> &#10004; Visual Design</p>
                            <p className="list-p"> &#10004; UX</p>
                            <p className="list-p"> &#10004; Design Software</p>
                            <p className="list-p"> &#10004; HTML & CSS</p>
                            <p className="list-p"> &#10004; Communication</p>
                            <p className="list-p"> &#10004; User Psychology</p>
                        </div>
                    </div>
                )}

                {careerPath == "product" && (
                    <div className="path-description">
                    <h2 className="path-title">What is a product manager?</h2>
                        <p className="path-p">
                            Product managers are responsible for guiding the success of a product and leading the cross-functional team that is responsible for improving it. It is an important organizational role — especially in technology companies — that sets the strategy, roadmap, and feature definition for a product or product line. <br /> <br />Product managers provide the deep product expertise needed to lead the organization and make strategic product decisions. They often analyze market and competitive conditions, laying out a product vision that is differentiated and delivers unique value based on customer demands.
                        </p>
                        <div className="list">
                            <p className="list-p"> &#10004; Product strategy</p>
                            <p className="list-p"> &#10004; User experience testing</p>
                            <p className="list-p"> &#10004; Task management</p>
                            <p className="list-p"> &#10004; Google Docs</p>
                            <p className="list-p"> &#10004; JIRA</p>
                            <p className="list-p"> &#10004; Trello</p>
                        </div>
                    </div>
                )}

            </div>
            <Courses careerPath={careerPath} />
            <div className="tutors-container">
            <div>
                <h2 className="path-title">Tutors</h2>
            </div>
            <div className="display-teachers">
                {teacher &&
                    teacher.map(t => (
                        <div key={t.id} className="teachers-container">
                        <div className="teacher-header">
                            <Link to={`/user/${t.teacher_id}`}>
                                <img
                                    className="teacher-avatar"
                                    src={t.image}
                                    alt={`${t.first} ${t.last}`}
                                />
                            </Link>
                            </div>
                            <p className="teacher-name">
                                {t.first} {t.last}
                            </p>
                            <p className="course-title">{t.offer}</p>
                            <Link
                                className="link-to-chat"
                                to={`/chat/${t.teacher_id}`}
                            >
                                <img className="chat-icon" src="/speech-bubble.png" />
                            </Link>
                        </div>
                    ))}
            </div>
            </div>
        </div>
    );
}
