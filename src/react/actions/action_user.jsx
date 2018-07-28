// action_user.jsx
import { showResponseError, showMsgError } from "../helper/error.jsx";


const getUsers = () => {
    return async (dispatch) => {
        dispatch({
            type: "USER_REQUEST",
            payload: false
        });

        try {
            let response = await fetch("/api/reg", { credentials: "same-origin" });
            if (response.status == 200) {
                let data = await response.json();
                dispatch({
                    type: "SET_STATE",
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

const addUser = (user) => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/reg", {
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(user)
            });

            if (response.status == 200) {
                let data = await response.json();
                dispatch({
                    type: "ADD_USER_SUCCESS",
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

const removeUser = (id) => {
    return async (dispatch) => {
        try {
            let response = await fetch(`/api/reg/${id}`, {
                credentials: "same-origin",
                method: "delete"
            });
            if (response.status == 200) {
                dispatch({
                    type: "REMOVE_USER_SUCCESS",
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
    getUsers,
    addUser,
    removeUser
}