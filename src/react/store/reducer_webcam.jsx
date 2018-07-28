// reducer_webcam.jsx
import clone from "clone";

const initState = {
    enable: false,
    record: false
};

export function reducerWebcam(state = initState, action) {
    switch (action.type) {

        case "WEBCAM_STATUS": {
            // return new state
            return action.payload;
        }; break;

        case "WEBCAM_ENABLED": {
            let cl_state = clone(state);
            cl_state.enable = action.payload;
            return cl_state;
        }; break;

        case "WEBCAM_DISABLED": {
            let cl_state = clone(state);
            cl_state.enable = action.payload;
            cl_state.record = action.payload;
            return cl_state;
        }; break;

        case "WEBCAM_RECORD": {
            let cl_state = clone(state);
            cl_state.record = action.payload;
            return cl_state;
        }; break;
    };

    return state;
};