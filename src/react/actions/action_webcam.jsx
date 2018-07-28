// action_webcam.jsx
import { showResponseError, showMsgError } from "../helper/error.jsx";


const status = () => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/webcam/status", { credentials: "same-origin" });
            if (response.status == 200) {
                let data = await response.json();
                dispatch({
                    type: "WEBCAM_STATUS",
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

const enable = () => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/webcam/enable", { credentials: "same-origin" });
            if (response.status == 200) {
                dispatch({
                    type: "WEBCAM_ENABLED",
                    payload: true
                })
            } else {
                showResponseError(response.status);
            };
        } catch (error) {
            showMsgError("Ошибка при попытке сетевого запроса, у вас точно есть интернет соеденение ?");
        };
    };
};

const disable = () => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/webcam/disable", { credentials: "same-origin" });
            if (response.status == 200) {
                dispatch({
                    type: "WEBCAM_DISABLED",
                    payload: false
                })
            } else {
                showResponseError(response.status);
            };
        } catch (error) {
            showMsgError("Ошибка при попытке сетевого запроса, у вас точно есть интернет соеденение ?");
        };
    };
};

const record = () => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/webcam/record", { credentials: "same-origin" });
            if (response.status == 200) {
                let data = await response.json();
                dispatch({
                    type: "WEBCAM_RECORD",
                    payload: data.record
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
    status,
    enable,
    disable,
    record
};