import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function CareerPath(props) {
    const [teacher, setTeacher] = useState();

    useEffect(() => {
        console.log("mounted!");
        console.log("props", props);
        (async () => {
            try {
                const path = props.match.params.path;
                const { data } = await axios.get(`/career/${path}.json`);
                console.log("data", data);
                setTeacher(data);
            } catch (err) {
                console.log("err in GET /career/:path", err);
            }
        })();
    }, []);

    return (
        <div>
            {teacher &&
                teacher.map(t => (
                    <div key={t.id}>
                        <p>
                            {t.first} {t.last}
                        </p>
                    </div>
                ))}
        </div>
    );
}
