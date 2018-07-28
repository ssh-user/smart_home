// reducer_saves.jsx


export function reducerWebcamSaves(state = [], action) {
    switch (action.type) {

        case "REFRESH_FILES": {
            state = action.payload;
        }; break;

        case "REMOVE_FILE": {
            // filter prev state without removed element.
            let cl_state = state.filter((elem) => {
                if (elem.name == action.payload)
                    return false;
                else
                    return true;
            });
            return cl_state;
        }; break;
    };

    return state;
};