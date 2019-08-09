import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [users, setUser] = useState();
    const [val, setValue] = useState();
    console.log("val", val);

    useEffect(
        () => {
            if (!val) {
                (async () => {
                    try {
                        const { data } = await axios.get("/users.json");
                        // console.log("data", data);
                        setUser(data);
                    } catch (err) {
                        console.log("err in GET /users", err);
                    }
                })();
            } else {
                (async () => {
                    try {
                        const { data } = await axios.get(`/search/${val}.json`);
                        console.log("data", data);
                        setUser(data);
                    } catch (err) {
                        console.log("err in GET /users", err);
                    }
                })();
            }
        },
        [val]
    );

    return (
        <div className="search-container">
            {!val ? <p className="search-text">Recently joined</p> : <p className="search-text">Find people</p>}
            <input
                className="search-input"
                name="finder"
                placeholder="find people"
                onChange={e => setValue(e.target.value)}
            />
            <div className="find-people-container">
            {users &&
                users.map(user => (
                    <div key={user.id} className="single-person">
                        <Link to={`/user/${user.id}`}>
                            <img
                                className="friends-avatar"
                                src={user.image}
                                alt={`${user.first} ${user.last}`}
                            />
                        </Link>
                        <h2 className="friends-name">
                            {user.first} {user.last}
                        </h2>
                    </div>
                ))}
                </div>
        </div>
    );
}
