import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "./axios";

export default function Courses(props) {
    const [courses, setCourses] = useState();
    const favcourses = useSelector(state => state.favcourses);
    // console.log("favcourses:", favcourses);

    useEffect(
        () => {
            (async () => {
                try {
                    // console.log("props:", props.careerPath);
                    const { data } = await axios.get(
                        "/courses/" + props.careerPath
                    );
                    console.log("data from API", data);
                    //
                    // const arr = [];

                    // data.forEach(i => {
                    //     // console.log("data.id:", i.id);
                    //     let finalarr = [];
                    //     favcourses.forEach(j => {
                    //         if (i.id != j.image_id) {
                    //             finalarr.push(i);
                    //         }
                    //     });
                    //
                    //     console.log("final array: ", finalarr);
                    // });

                    // if (i.id != j.image_id) {
                    //     console.log("what we want to show: ", i);
                    // }

                    // favcourses.forEach(j => {
                    //     if (i.id != j.image_id) {
                    //         arr.push(i);
                    //     }
                    // })

                    // console.log("favorite courses:", favcourses);
                    // console.log("new array", arr);

                    setCourses(data);
                } catch (err) {
                    console.log("err in GET /courses", err);
                }
            })();
        },
        [props.careerPath]
    );

    async function submit(course) {
        try {
            const { data } = await axios.post("/fav-course", course);
            // console.log(courses);
            const newList = courses.filter(
                course => course.id != data.image_id
            );
            setCourses(newList);
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
                                src="/add-to-favorites-icon.png"
                                onClick={() => submit(course)}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}

// https://www.udemy.com/api-2.0/courses/?search=%20Web%20Development&price=price-free&instructional_level=beginner&ordering=price-low-to-high"");
