// action_log_alarm.jsx
import { showResponseError, showMsgError } from "../helper/error.jsx";


const getAlarmLog = () => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/sensors/log_alarm", { credentials: "same-origin" });
            if (response.status == 200) {
                let data = await response.json();
                dispatch({
                    type: "ALARM_LIST",
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

const removeAllAlarm = () => {
    return async (dispatch) => {
        try {
            let response = await fetch(`/api/sensors/log_alarm_rem`, {
                credentials: "same-origin",
                method: "delete"
            });
            if (response.status == 200) {
                dispatch({
                    type: "REMOVE_ALL_SUCCESS",
                    payload: []
                })
            } else {
                showResponseError(response.status);
            };
        } catch (error) {
            showMsgError("Ошибка при попытке сетевого запроса, у вас точно есть интернет соеденение ?");
        };
    };
};

const removeAlarm = (id) => {
    return async (dispatch) => {
        try {
            let response = await fetch(`/api/sensors/log_alarm/${id}`, {
                credentials: "same-origin",
                method: "delete"
            });
            if (response.status == 200) {
                dispatch({
                    type: "REMOVE_ALARM_SUCCESS",
                    payload: id
                })
            } else {
                showResponseError(response.status);
            };
        } catch (error) {
            showMsgError("Ошибка при попытке сетевого запроса, у вас точно есть интернет соеденение ?");
        };
    }
};

export default {
    getAlarmLog,
    removeAllAlarm,
    removeAlarm
}