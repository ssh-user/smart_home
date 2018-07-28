// action_menu.jsx

const changeActiveElement = function (id) {
    return {
        type: "CHANGE_ACTIVE",
        payload: id
    };
};

export default {
    changeActiveElement
};