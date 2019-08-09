import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends, accept, unfriend } from "./actions";
import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();
    const wannabes = useSelector(
        state => state.friends && state.friends.filter(i => i.accepted == false)
    );
    const friends = useSelector(
        state => state.friends && state.friends.filter(i => i.accepted == true)
    );
    console.log("wannabes", wannabes);
    console.log("friends", friends);

    useEffect(() => {
        dispatch(getFriends());
    }, []);


    if (!wannabes) {
        return null;
    }
    return (
        <div className="friends-container">
            <div className="friends-list">
            <p className="friend-text">Friend requests</p>
                {wannabes &&
                    wannabes.map(friend => (
                        <div  className="single-friend" key={friend.id}>
                            <Link to={`/user/${friend.id}`}>
                                <img
                                    className="friends-avatar"
                                    src={friend.image}
                                    alt={`${friend.first} ${friend.last}`}
                                />
                            </Link>
                                <h2 className="friends-name">
                                    {friend.first} {friend.last}
                                </h2>


                            <button className="friends-btn" onClick={e => dispatch(accept(friend.id))}>
                                Accept
                            </button>
                            </div>
                    ))}
            </div>
            <div className="friends-list">
            <p className="friend-text">Friends</p>
                {friends &&
                    friends.map(friend => (
                        <div className="single-friend" key={friend.id}>
                            <Link to={`/user/${friend.id}`}>
                                <img
                                    className="friends-avatar"
                                    src={friend.image}
                                    alt={`${friend.first} ${friend.last}`}
                                />
                            </Link>
                                <h2 className="friends-name">
                                    {friend.first} {friend.last}
                                </h2>
                            <button className="friends-btn"
                                onClick={e => dispatch(unfriend(friend.id))}
                            >
                                Unfriend
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
} //closes Friends function

//
