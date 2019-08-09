import React, { useState, useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Chat() {
    const chatMessages = useSelector(state => state && state.message);
    const newMessage = useSelector(state => state && state.message);

    // console.log("my new message", newMessage);
    // console.log("here are my last 10 messages", chatMessages);

    const elemRef = useRef();

    useEffect(
        () => {
            // console.log("chat hooks mounted");
            // console.log("elemRef:", elemRef);
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
        },
        [chatMessages]
    ); //when smth here changes - we need to check

    const keyCheck = e => {
        // console.log("e.target.value", e.target.value);
        // console.log("e.key", e.key);
        if (e.key == "Enter" && e.target.value !== "") {
            e.preventDefault(); //prevents jump to the next line
            // console.log("Enter was clicked");
            socket.emit("new chat message", e.target.value);
            //cleaning inp field:
            e.target.value = "";
        }
    };

    return (
        <div className="chat">
            <h1 className="search-text">Chat Room</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(msg => (
                        <div className="chat-box" key={msg.id}>
                            <img
                                className="chat-img"
                                src={msg.image}
                                alt={`${msg.first} ${msg.last}`}
                            />
                            <Link className="link-to-pm" to={`/chat/${msg.sender_id}`}>
                                <h2 className="chat-name">
                                    {msg.first} {msg.last}
                                </h2>
                            </Link>
                            <div className="message">
                                <p className="chat-message">{msg.message}</p>
                                <p className="post_time">{msg.created_at}</p>
                            </div>
                        </div>
                    ))}
            </div>
            <textarea
                className="chat-textarea"
                placeholder="Add your message here"
                onKeyDown={keyCheck}
            />
        </div>
    );
}
