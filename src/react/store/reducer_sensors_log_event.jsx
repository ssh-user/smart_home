// reducer_sensors_log_event.jsx


export function reducerLogEvent(state = [], action) {
    switch (action.type) {

        case "EVENTS_LIST": {
            // return new events list.
            return action.payload;
        }; break;

        case "REMOVE_ALL_SUCCESS": {
            // return empty state.
            return action.payload;
        }; break;

        case "REMOVE_EVENT_SUCCESS": {
            // filter prev state without removed element.
            let cl_state = state.filter((elem) => {
                if (elem.id == action.payload)
                    return false;
                else
                    return true;
            });
            return cl_state;
        }; break;
    };

    return state;
};