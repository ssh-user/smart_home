// reducer_sys_info.jsx
import { system } from "./data/system_info.jsx";


export function reducerSystemInfo(state = system, action) {
    switch (action.type) {

        case "GET_SYSTEM_INFO": {
            // return request result a new data
            return action.payload;
        }; break;

    };

    return state;
};