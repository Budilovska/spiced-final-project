import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton(props) {
    const [button, setButton] = useState();
    console.log("friendship", button);

    useEffect(() => {
        console.log("mounted");
        (async () => {
            try {
                const { data } = await axios.get(
                    `/friendship/${props.otherProfileId}`
                );
                console.log("data.buttonText", data.buttonText);
                setButton(data.buttonText);
            } catch (err) {
                console.log("err in GET /frienship", err);
            }
        })();
    }, []);

    async function submit() {
        // console.log("clicked button");
        try {
            const { data } = await axios.post(
                `/friendship/${props.otherProfileId}`,
                { button }
            );
            setButton(data.buttonText);
        } catch (err) {
            console.log("err in POST /frienship", err);
        }
    }

    return (
        <div>
            <button className="bio-btn" onClick={submit}>{button}</button>
        </div>
    );
}
