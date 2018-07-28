// reducer_menu.jsx
import { MENU_ELEMENTS_LIST } from "./data/menu_links.jsx";


export function reducerMenu(state = MENU_ELEMENTS_LIST, action) {
    switch (action.type) {

        case "CHANGE_ACTIVE": {
            return state.map((elem) => {
                if (elem.id === action.payload)
                    elem.active = true;
                else
                    elem.active = false;

                return elem;
            });
        }; break;

    };

    return state;
};