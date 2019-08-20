import React, { useState, useEffect } from "react";
import axios from "./axios";
import Checkbox from "./checkbox";

export default function TeacherInfo(props) {
    const [checkedItems, setCheckedItems] = useState({});

    async function handleChange(e) {
        setCheckedItems({
            ...checkedItems,
            [e.target.name]: e.target.checked
        });
    }

    useEffect(
        () => {
            (async () => {
                try {
                    const expertise = Object.keys(checkedItems);
                    console.log(expertise[0]);
                    const { data } = await axios.post("/choice", {
                        expertise: expertise[0]
                    });
                    console.log("data", data);
                    props.checkboxIsVisible(false);
                } catch (err) {
                    console.log("err in GET /users", err);
                }
            })();
        },
        [checkedItems]
    );

    // console.log("checkedItems: ", checkedItems);

    const checkboxes = [
        {
            name: "code",
            key: "box1",
            label: "code"
        },
        {
            name: "design",
            key: "box2",
            label: "web design"
        },
        {
            name: "film",
            key: "box3",
            label: "film"
        },
        {
            name: "marketing",
            key: "box4",
            label: "marketing"
        },
        {
            name: "photography",
            key: "box5",
            label: "photography"
        },
        {
            name: "management",
            key: "box6",
            label: "management"
        }
    ];

    return (
        <div className="pick-expertise">
            <div className="expertise-container">
                <h2 className="checkbox-title">Thank you for joining us as a tutor, {props.first}!</h2>
                <p className="checkbox-title2">Pick your area of expertise</p>
                <label>
                    {checkedItems["check-box-1"]}{" "}
                </label>
                <br />
                <div className="check">
                {checkboxes.map(item => (
                    <label key={item.key} className="checkbox-label">
                        {item.name}
                        <Checkbox
                            name={item.name}
                            checked={checkedItems[item.name]}
                            onChange={handleChange}
                        />
                    </label>
                ))}
                </div>
            </div>
        </div>
    );
}
