import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "./actions";
import Courses from "./courses";
import AboutCareer from "./aboutCareer";
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';


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
                    <AboutCareer careerPath={careerPath} />
                )}

                {careerPath == "design" && (
                    <AboutCareer careerPath={careerPath} />
                )}

                {careerPath == "product" && (
                    <AboutCareer careerPath={careerPath} />
                )}
                {careerPath == "datascience" && (
                    <AboutCareer careerPath={careerPath} />
                )}
                {careerPath == "smm" && (
                    <AboutCareer careerPath={careerPath} />
                )}
                {careerPath == "marketing" && (
                    <AboutCareer careerPath={careerPath} />
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
