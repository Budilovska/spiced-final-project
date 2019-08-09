import React from "react";

export default function Profile(props) {
    return (
        <div>
            <div className="profile-container">
                <div className="profile-avatar">{props.avatar}</div>

                <div className="profile-name-bio">
                    <h2 className="profile-name">
                        {props.first} {props.last}
                    </h2>
                    {props.bioeditor}
                </div>
            </div>
        </div>
    );
}
