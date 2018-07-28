// action_logout.jsx
import { showResponseError, showMsgError } from "../helper/error.jsx";


const logout = () => {
    return async () => {
        try {
            let response = await fetch("/api/logout", { credentials: "same-origin" });
            if (response.status == 200) {

                // go to home page should redirect to login
                document.location.href = "/";
            } else {
                showResponseError(response.status);
            };
        } catch (error) {
            showMsgError("Ошибка при попытке сетевого запроса, у вас точно есть интернет соеденение ?");
        };
    };
};

export default {
    logout
};