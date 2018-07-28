// action_log_events.jsx
import { showResponseError, showMsgError } from "../helper/error.jsx";


const getEventsLog = () => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/sensors/log_event", { credentials: "same-origin" });
            if (response.status == 200) {
                let data = await response.json();
                dispatch({
                    type: "EVENTS_LIST",
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

const removeAllEvents = () => {
    return async (dispatch) => {
        try {
            let response = await fetch(`/api/sensors/log_event_rem`, {
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

const removeEvent = (id) => {
    return async (dispatch) => {
        try {
            let response = await fetch(`/api/sensors/log_event/${id}`, {
                credentials: "same-origin",
                method: "delete"
            });
            if (response.status == 200) {
                dispatch({
                    type: "REMOVE_EVENT_SUCCESS",
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
    getEventsLog,
    removeAllEvents,
    removeEvent
}