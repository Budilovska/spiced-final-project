export default function(state = {}, action) {
    if (action.type == "GET_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
    }
    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friends: state.friends.map(friend => {
                if (friend.id != action.id) {
                    return friend;
                }
                return {
                    friend: null
                };
            })
        };
    }
    if (action.type == "ACCEPT") {
        state = {
            ...state,
            friends: state.friends.map(friend => {
                if (friend.id != action.id) {
                    return friend;
                }
                return {
                    ...friend,
                    accepted: true
                };
            })
        };
    }

    if (action.type == "NEW_CHAT_MESSAGE") {
        state = {
            ...state,
            message: [...state.message, action.message]
        };
    }

    if (action.type == "CHAT_MESSAGES") {
        state = {
            ...state,
            message: action.message.reverse()
        };
    }

    if (action.type == "NEW_PRIVATE_MESSAGE") {
        state = {
            ...state
        };
        return {
            ...state,
            pm: state.pm ? [...state.pm, action.pm] : [action.pm]
        };
    }

    if (action.type == "LAST_PRIVATE_MESSAGES") {
        state = {
            ...state,
            pm: action.pm.reverse()
        };
    }

    return state;
}
