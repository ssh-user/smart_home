// action_sms.jsx
import { showResponseError, showMsgError } from "../helper/error.jsx";


const getSMS = () => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/sensors/sms", { credentials: "same-origin" });
            if (response.status == 200) {
                let data = await response.json();
                dispatch({
                    type: "SMS_LIST",
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

const changeCoding = (id) => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/sensors/sms", {
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(id)
            });

            if (response.status == 200) {
                let data = await response.json();
                dispatch({
                    type: "CHANGE_CODING_SUCCESS",
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

const removeSMS = (id) => {
    return async (dispatch) => {
        try {
            let response = await fetch(`/api/sensors/sms/${id}`, {
                credentials: "same-origin",
                method: "delete"
            });
            if (response.status == 200) {
                dispatch({
                    type: "REMOVE_SMS_SUCCESS",
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
    getSMS,
    changeCoding,
    removeSMS
}