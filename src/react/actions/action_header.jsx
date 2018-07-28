// action_header.jsx

const changeHeader = function (title) {
    return {
        type: "CHANGE_HEADER",
        payload: title
    };
};

export default {
    changeHeader
};