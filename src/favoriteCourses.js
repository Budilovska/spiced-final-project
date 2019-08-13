import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteCourses } from "./actions";
import axios from "./axios";

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
        <div>
            {favCourses && favCourses.length == 0 ? (
                <div>
                    <h2>You don't have favorite courses yet</h2>
                </div>
            ) : (
                <div>
                    <h2>My favorite courses</h2>
                    {favCourses &&
                        favCourses.map(course => (
                            <div key={course.image_id} className="course-item">
                                <a id="course-link" href={course.url}>
                                    <img
                                        className="course-img"
                                        src={course.image}
                                    />
                                </a>
                                <h2 className="course-title">{course.title}</h2>
                                <img
                                    className="add-to-fav-icon"
                                    src="/remove-from-fav.png"
                                    onClick={() => submit(course)}
                                />
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}
