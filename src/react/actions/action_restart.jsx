// action_restart.jsx
import { showResponseError, showMsgError } from "../helper/error.jsx";


const restart = () => {
    return async (dispatch) => {
        try {
            let response = await fetch("/api/restart", { credentials: "same-origin" });
            if (response.status == 200) {
                // enable "restarting" view with progress bar.
                // count of progress bar.
                let count = 1;

                // first start
                dispatch({
                    type: "RESTARTING",
                    payload: count
                });

                // interval for progress bar.                
                let interval = setInterval(() => {
                    count += 2;
                    dispatch({
                        type: "RESTARTING",
                        payload: count
                    });
                }, 200);

                // after 10 seconds disable view
                setTimeout(() => {
                    // stop interval.
                    clearInterval(interval);

                    // set to default value.
                    dispatch({
                        type: "RESTARTING",
                        payload: null
                    });

                    // go to home page
                    document.location.href = "/";
                }, 10 * 1000);
            } else {
                showResponseError(response.status);
            };
        } catch (error) {
            showMsgError("Ошибка при попытке сетевого запроса, у вас точно есть интернет соеденение ?");
        };
    };
};

export default {
    restart
};