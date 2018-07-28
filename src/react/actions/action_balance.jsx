// action_balance.jsx
import { showResponseError, showMsgError } from "../helper/error.jsx";


const getBalance = () => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/sensors/balance", { credentials: "same-origin" });
            if (response.status == 200) {
                let data = await response.json();

                // if empty answer - nothing doing.
                if (!data) return;

                dispatch({
                    type: "GET_BALANCE",
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

const updateBalance = () => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/sensors/balance", {
                credentials: "same-origin",
                method: "PUT",
            });
            if (response.status == 200) {
                // nothing doing :)
            } else {
                showResponseError(response.status);
            };
        } catch (error) {
            showMsgError("Ошибка при попытке сетевого запроса, у вас точно есть интернет соеденение ?");
        };
    };
};

export default {
    getBalance,
    updateBalance
};