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
            label: "code",
            title: "web development"
        },
        {
            name: "design",
            key: "box2",
            label: "web design",
            title: "web design"
        },
        {
            name: "smm",
            key: "box3",
            label: "smm",
            title: "social media management"
        },
        {
            name: "marketing",
            key: "box4",
            label: "marketing",
            title: "digital marketing"
        },
        {
            name: "datascience",
            key: "box5",
            label: "datascience",
            title: "data science"
        },
        {
            name: "product",
            key: "box6",
            label: "product",
            title: "product management"
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
                        <Checkbox
                            name={item.name}
                            checked={checkedItems[item.name]}
                            onChange={handleChange}
                        /> {item.title}
                    </label>
                ))}
                </div>
            </div>
        </div>
    );
}
