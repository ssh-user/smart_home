// action_sensors.jsx
import { showResponseError, showMsgError } from "../helper/error.jsx";


const getStatus = () => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/sensors/status", { credentials: "same-origin" });
            if (response.status == 200) {
                let data = await response.json();
                dispatch({
                    type: "GET_STATUS",
                    payload: data
                })
            } else {
                showResponseError(response.status);
            };
        } catch (error) {
            showMsgError("Ошибка при попытке сетевого запроса, у вас точно есть интернет соеденение ?");
        };
    };
};

export default {
    getStatus
};