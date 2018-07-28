// reducer_sensors_sms.jsx


export function reducerSMS(state = [], action) {
    switch (action.type) {

        case "SMS_LIST": {
            // return new sms list.
            return action.payload;
        }; break;

        case "CHANGE_CODING_SUCCESS": {
            // find changed element by id and return new array.
            let cl_state = state.map((elem) => {
                if (elem.id == action.payload.id)
                    return action.payload;
                else
                    return elem;
            });

            return cl_state;
        }; break;

        case "REMOVE_SMS_SUCCESS": {
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