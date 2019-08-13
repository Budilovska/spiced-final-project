export default function(state = {}, action) {
    if (action.type == "GET_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
    }

    if (action.type == "FAV_COURSES") {
        state = {
            ...state,
            favcourses: action.data
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

    if (action.type == "ADD_FAVORITES") {
        state = {
            ...state,
            button: action.button
        };
    }

    return state;
}
