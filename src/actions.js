import axios from "./axios";

export async function addToFavorites(id, name) {
    const { data } = await axios.post(`/favorites/${id}`, {
        name: name,
        button: `Add ${name} to favorites`
    });
    console.log("data", data);
    return {
        type: "ADD_FAVORITES",
        buttonText: data
    };
}

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
