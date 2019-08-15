import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import TeacherInfo from "./teacherInfo";
import FavoriteCourses from "./favoriteCourses";

export default function Profile(props) {
    const [role, setRole] = useState();
    const [checkbox, checkboxIsVisible] = useState(true);
    console.log("the role is", role);
    console.log(checkbox);

    useEffect(() => {
        console.log("mounted");
        (async () => {
            try {
                const { data } = await axios.get("/user");
                console.log("data", data);
                if (data.careerpath) {
                    checkboxIsVisible(false);
                }
                setRole(data.role);
            } catch (err) {
                console.log("err in GET /users", err);
            }
        })();
    }, []);

    return (
        <div>
            {role == "student" ? (
                <div className="profile-container">
                    <div className="profile-avatar">{props.avatar}
                    <h2 className="profile-name">
                        {props.first} <br />{props.last}
                    </h2>
                    {props.bioeditor}
                    </div>
                    <div>
                        <FavoriteCourses />
                    </div>
                </div>
            ) : (
                <div className="profile-container">
                <div className="teach-prof">
                    <div className="profile-avatar">{props.avatar}</div>

                        <h2 className="profile-name">
                            {props.first} {props.last}
                        </h2>
                        {props.bioeditor}
                        {props.offer}
                        </div>


                    {checkbox && (
                        <TeacherInfo
                            id={props.id}
                            first={props.first}
                            last={props.last}
                            checkboxIsVisible={checkboxIsVisible}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
