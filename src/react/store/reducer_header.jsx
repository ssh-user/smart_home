// reducer_header.jsx

const init = {
    title: "Привет!"
};

export function reducerHeader(state = init, action) {
    switch (action.type) {

        case "CHANGE_HEADER": {
            return {
                title: action.payload
            };
        }; break;

    };

    return state;
};