// action_sys_info.jsx
import { showResponseError, showMsgError } from "../helper/error.jsx";


const getSystemInfo = () => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/sys_info", { credentials: "same-origin" });
            if (response.status == 200) {
                let info = await response.json();
                dispatch({
                    type: "GET_SYSTEM_INFO",
                    payload: info
                })
            } else {
                showResponseError(response.status);
            };
        } catch (error) {
            showMsgError("Ошибка при попытке сетевого запроса, у вас точно есть интернет соеденение ?");
        };
    };
};

const toggleAlarm = () => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/alarm", { credentials: "same-origin" });
            if (response.status == 200) {
                // nothing doing.
            } else {
                showResponseError(response.status);
            };
        } catch (error) {
            showMsgError("Ошибка при попытке сетевого запроса, у вас точно есть интернет соеденение ?");
        };
    };
};


export default {
    getSystemInfo,
    toggleAlarm
};