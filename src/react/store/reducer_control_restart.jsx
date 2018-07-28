// reducer_control_restart.jsx

let initState = { restarting: false };

export function reducerControlRestart(state = initState, action) {
    switch (action.type) {

        case "RESTARTING": {
            state = { restarting: action.payload };
        }; break;

    };

    return state;
};