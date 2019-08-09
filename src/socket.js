import * as io from "socket.io-client";
import {
    chatMessages,
    newChatMessage,
    newPrivateMessage,
    privateMessages
} from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("newChatMessage", data =>
            store.dispatch(newChatMessage(data))
        );

        socket.on("chatMessages", data => store.dispatch(chatMessages(data)));

        socket.on("newPrivateMessage", data => {
            store.dispatch(newPrivateMessage(data));
        });

        socket.on("privateMessages", data =>
            store.dispatch(privateMessages(data))
        );
    }
};

// socket.on('greeting', payload => console.log(payload));
//
// socket.emit('niceToBeHere', {
//     chicken: 'funky'
// });
