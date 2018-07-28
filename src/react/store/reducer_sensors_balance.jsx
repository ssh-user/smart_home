// reducer_sensors_balance.jsx

const balance = {
    time: null,
    score: null
};

export function reducerBalance(state = balance, action) {
    switch (action.type) {

        case "GET_BALANCE": {
            // return new state
            return action.payload;
        }; break;
    };

    return state;
};