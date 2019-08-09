import axios from "./axios";

export async function getFriends() {
    const { data } = await axios.get("/friends.json");
    // console.log("data from actions", data);
    return {
        type: "GET_FRIENDS",
        friends: data
    };
}

export async function unfriend(id) {
    const { data } = await axios.post(`/friendship/${id}`, {
        button: "Unfriend"
    });
    // console.log("data", data);
    return {
        type: "UNFRIEND",
        id
    };
}

export async function accept(id) {
    const { data } = await axios.post(`/friendship/${id}`, {
        button: "Accept friend request"
    });
    // console.log("data", data);
    return {
        type: "ACCEPT",
        id
    };
}

export function newChatMessage(data) {
    console.log("data", data);
    return {
        type: "NEW_CHAT_MESSAGE",
        message: data
    };
}

export function chatMessages(data) {
    // console.log("10 messages data", data);
    return {
        type: "CHAT_MESSAGES",
        message: data
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
