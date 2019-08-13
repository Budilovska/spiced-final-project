import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Courses(props) {
    const [courses, setCourses] = useState();
    const [favCourseId, setFavCourseId] = useState();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/courses");
                console.log("data", data);
                setCourses(data);
            } catch (err) {
                console.log("err in GET /courses", err);
            }
        })();
    }, []);

    async function submit(course) {
        console.log("clicked on a button");
        console.log(course);
        try {
            const { data } = await axios.post("/fav-course", course);
            console.log("data", data.image_id);
            setFavCourseId();
            console.log(courses);
            // const newArray = courses.filter(i => i.id !== data.image_id);
            const newList = courses.filter(
                course => course.id != data.image_id
            );

            setCourses(newList);

            // courses.filter(i => courses)
        } catch (err) {
            console.log("err in GET /fav-course", err);
        }
    }

    return (
        <div>
            <h2>Courses</h2>
            <div className="courses-container">
                {courses &&
                    courses.map(course => (
                        <div key={course.id} className="course-item">
                            <a
                                id="course-link"
                                href={"https://www.udemy.com" + course.url}
                            >
                                <img
                                    className="course-img"
                                    src={course.image_480x270}
                                />
                            </a>
                            <h2 className="course-title">{course.title}</h2>
                            <img
                                className="add-to-fav-icon"
                                src="/add-to-favorites-icon-1-128x128.png"
                                onClick={() => submit(course)}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}

// https://www.udemy.com/api-2.0/courses/?search=%20Web%20Development&price=price-free&instructional_level=beginner&ordering=price-low-to-high"");
