import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "./actions";

export default function CareerPath(props) {
    const dispatch = useDispatch();
    const [teacher, setTeacher] = useState();
    const [careerPath, setPath] = useState();

    const button = useSelector(state => state.button);
    const favorites = useSelector(state => state.favorites);

    console.log("button", button);

    useEffect(() => {
        (async () => {
            try {
                const path = props.match.params.path;
                const { data } = await axios.get(`/career/${path}.json`);
                console.log("data", data);
                setTeacher(data);
                setPath(data[0].careerpath);
            } catch (err) {
                console.log("err in GET /career/:path", err);
            }
        })();
    }, []);

    return (
        <div>
            <div className="career-description">
                <h2>Learn more about {careerPath}</h2>
                {careerPath == "code" && (
                    <div className="path-description">
                        <p>
                            Interested in learning how to code, but unsure where
                            to start? The Code Foundations path provides an
                            overview of the main applications of programming:
                            computer science, web development, and data science.
                            It also teaches important concepts that you'll find
                            in every programming language, such as variables,
                            functions, and control flow. After completing this
                            path, you'll understand key programming terms and
                            you'll be ready to chart your course to a more
                            technical career.
                        </p>
                        <ul>
                            <li>HTML & CSS</li>
                            <li>Python</li>
                            <li>JavaScript</li>
                            <li>Java</li>
                            <li>SQL</li>
                            <li>C++</li>
                        </ul>
                    </div>
                )}
            </div>
            <div>
                <h2>Pick an offer from a mentor</h2>
            </div>
            <div className="display-teachers">
                {teacher &&
                    teacher.map(t => (
                        <div key={t.id} className="teachers-container">
                            <img
                                className="teacher-avatar"
                                src={t.image}
                                alt={`${t.first} ${t.last}`}
                            />
                            <p className="offer-text">
                                {t.first} {t.last} offers {t.offer}
                            </p>
                            <button
                                className="favorites-btn"
                                onClick={e =>
                                    dispatch(
                                        addToFavorites(t.teacher_id, t.first)
                                    )
                                }
                            >
                                Add {t.first} to favorites
                            </button>
                            <Link
                                className="link-to-chat"
                                to={`/chat/${t.teacher_id}`}
                            >
                                Chat with a teacher
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}
