import React from "react";

export default function({ image, first, last, onClick }) {
    image = image || "default-avatar.jpg";
    return (
        <img
            className="avatar"
            src={image}
            alt={`${first} ${last}`}
            onClick={onClick}
        />
    );
}

//avatar makes uploader appear
//we can pass any value as a functiom
// we create a function in App, that's called onClick. we pass it as props to avatar component
