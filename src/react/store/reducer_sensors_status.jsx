// reducer_sensors_status.jsx

const sensors = {
    gsm: null,
    model: null,
    signal: null,
    sim: null,
    status: null
};

export function reducerSensors(state = sensors, action) {
    switch (action.type) {

        case "GET_STATUS": {
            // return new state
            return action.payload;
        }; break;

    };

    return state;
};