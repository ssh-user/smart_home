// action_saves.jsx
import { showResponseError, showMsgError } from "../helper/error.jsx";


const refresh = () => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/webcam_files", { credentials: "same-origin" });
            if (response.status == 200) {
                let data = await response.json();

                // if empty answer - nothing doing.
                if (!data) return;

                dispatch({
                    type: "REFRESH_FILES",
                    payload: data
                });
            } else {
                showResponseError(response.status);
            };
        } catch (error) {
            showMsgError("Ошибка при попытке сетевого запроса, у вас точно есть интернет соеденение ?");
        };
    };
};

const removeFile = (name) => {
    return async (dispatch) => {
        try {
            let response = await fetch(`/api/webcam_files/${name}`, {
                credentials: "same-origin",
                method: "DELETE",
            });
            if (response.status == 200) {
                dispatch({
                    type: "REMOVE_FILE",
                    payload: name
                });
            } else {
                showResponseError(response.status);
            };
        } catch (error) {
            showMsgError("Ошибка при попытке сетевого запроса, у вас точно есть интернет соеденение ?");
        };
    };
};

const downloadVideoFile = (name) => {
    return () => {
        window.location.href = `/api/download/${encodeURIComponent(name)}`;
    };
};


export default {
    refresh,
    removeFile,
    downloadVideoFile
};