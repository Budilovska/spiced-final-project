import React, { useState, useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function PrivateChat(props) {
    const message = useSelector(state => state && state.pm);
    const id = props.match.params.id;

    const elemRef = useRef();

    useEffect(
        () => {
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
        },
        [message]
    );

    useEffect(() => {
        socket.emit("get last private messages", { receiver_id: id });
    }, []);

    const keyCheck = e => {
        if (e.key == "Enter" && e.target.value !== "") {
            e.preventDefault();

            socket.emit("private message", e.target.value, { receiver_id: id });
            e.target.value = "";
        }
    };

    return (
        <div className="chat">
        <img className="blob7" src="/blob7.svg" />
        <img className="blob6" src="/blob6.svg" />
        <h1 className="chat-text">Messenger</h1>
            <div className="chat-container" ref={elemRef}>
                {message &&
                    message.map(msg => (
                        <div className="chat-box" key={msg.id}>
                            <img
                                className="chat-img"
                                src={msg.image}
                                alt={`${msg.first} ${msg.last}`}
                            />
                            <h2 className="chat-name">
                                {msg.first} {msg.last}
                            </h2>
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
