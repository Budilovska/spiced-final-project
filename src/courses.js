import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "./axios";
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor'

configureAnchors({offset: -200, scrollDuration: 400});

export default function Courses(props) {
    const [courses, setCourses] = useState();
    const [sortedCourses, setsortedCourses] = useState(false);
    const favcourses = useSelector(state => state.favcourses);
    // console.log("favcourses:", favcourses);
    if (favcourses && courses && !sortedCourses) {
        const favId = favcourses.map(course => Number(course.image_id));
        // console.log("favId", favId);
        const sorted = courses.filter(course => !favId.includes(course.id));
        // console.log("sorted", sorted);
        setCourses(sorted);
        setsortedCourses(true);
    }

    useEffect(() => {}, [favcourses, courses]);

    useEffect(
        () => {
            (async () => {
                try {
                    // console.log("props:", props.careerPath);
                    const { data } = await axios.get(
                        "/courses/" + props.careerPath
                    );
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
       <div className="courses-main-container">
        <div>
        <h2 className="path-title">Courses</h2>

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
        </div>
    );
}

// https://www.udemy.com/api-2.0/courses/?search=%20Web%20Development&price=price-free&instructional_level=beginner&ordering=price-low-to-high"");
