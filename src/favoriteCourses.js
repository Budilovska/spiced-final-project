import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteCourses } from "./actions";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FavoriteCourses() {
    const [favCourses, setFavCourses] = useState();
    console.log(favCourses);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/get-fav-courses");
                // console.log("fav courses", data);
                setFavCourses(data);
                dispatch(setFavoriteCourses(data));
            } catch (err) {
                console.log("err in GET /get-fav-courses", err);
            }
        })();
    }, []);

    async function submit(course) {
        try {
            const { data } = await axios.post("/delete-course", course);
            console.log(data);
            const newList = favCourses.filter(
                course => course.image_id != data.deletedId
            );
            setFavCourses(newList);
        } catch (err) {
            console.log("err in GET /fav-course", err);
        }
    }

    return (
        <div className="favcourses-container">
            {favCourses && favCourses.length == 0 ? (
                <div className="favcourses-title">

                <Link to={"/careers"} className="no-courses-link">
                    Discover careers
                </Link>

                </div>
            ) : (
                <div>
                <div>
                <h2 className="favcourses-title">Discover courses</h2>
                </div>
                <div className="favcourses">


                    {favCourses &&
                        favCourses.map(course => (
                            <div key={course.image_id} className="course-item">
                            <div>
                                <a id="course-link" href={course.url}>
                                    <img
                                        className="course-img"
                                        src={course.image}
                                    />
                                </a>
                                </div>
                            <div className="course-header">
                            <img
                                className="remove-from-fav-icon"
                                src="/remove-from-fav.png"
                                onClick={() => submit(course)}
                            />
                            <h2 className="course-title">{course.title}</h2>
                            </div>
                            </div>
                        ))}
                </div>
                </div>
            )}
        </div>
    );
}
