import React from "react";

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
    // console.log("Checkbox: ", name, checked);

    return (
        <input type={type} name={name} checked={checked} onChange={onChange} />
    );
};
export default Checkbox;
