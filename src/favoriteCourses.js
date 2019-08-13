import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FavoriteCourses(props) {
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/get-fav-courses");
                console.log("data", data);
            } catch (err) {
                console.log("err in GET /get-fav-courses", err);
            }
        })();
    }, []);

    return (
        <div>
            <h2>My favorite courses {props.id}</h2>
        </div>
    );
}
