// reducer_user.jsx
import clone from "clone";


const initState = {
    users: [],
    fetching: false
};

export function reducerUser(state = initState, action) {
    switch (action.type) {

        case "SET_STATE": {
            return {
                users: action.payload,
                fetching: false
            };
        }; break;

        case "USER_REQUEST": {
            let cl_state = clone(state);
            cl_state.fetching = true;
            return cl_state;
        }; break;

        case "ADD_USER_SUCCESS": {
            let cl_state = clone(state);
            cl_state.users.push(action.payload);
            cl_state.fetching = false;
            return cl_state;
        }; break;

        case "REMOVE_USER_SUCCESS": {
            let cl_state = clone(state);
            cl_state.users = cl_state.users.filter((user) => {
                return user.id !== action.payload;
            });
            cl_state.fetching = false;
            return cl_state;
        }; break;
    };

    return state;
};