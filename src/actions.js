import axios from "./axios";

export async function setFavoriteCourses(data) {
    console.log("data from actions", data);
    return {
        type: "FAV_COURSES",
        data: data
    };
}

export function newPrivateMessage(data) {
    console.log("new private message:", data);
    return {
        type: "NEW_PRIVATE_MESSAGE",
        pm: data
    };
}

export function privateMessages(data) {
    console.log("last private messages", data);
    return {
        type: "LAST_PRIVATE_MESSAGES",
        pm: data
    };
}
