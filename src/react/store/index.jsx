import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import { reducerUser } from "./reducer_user.jsx";
import { reducerHeader } from "./reducer_header.jsx";
import { reducerMenu } from "./reducer_menu.jsx";
import { reducerWebcam } from "./reducer_webcam.jsx";
import { reducerWebcamSaves } from "./reducer_saves.jsx";
import { reducerSystemInfo } from "./reducer_sys_info.jsx";
import { reducerSensors } from "./reducer_sensors_status.jsx";
import { reducerSMS } from "./reducer_sensors_sms.jsx";
import { reducerBalance } from "./reducer_sensors_balance.jsx";
import { reducerLogEvent } from "./reducer_sensors_log_event.jsx";
import { reducerLogAlarm } from "./reducer_sensors_log_alarm.jsx";
import { reducerControlRestart } from "./reducer_control_restart.jsx";


export const store = createStore(combineReducers({
    USER: reducerUser,
    HEADER: reducerHeader,
    MENU: reducerMenu,
    WEBCAM: reducerWebcam,
    SYSTEM: reducerSystemInfo,
    SENSORS: reducerSensors,
    SMS: reducerSMS,
    BALANCE: reducerBalance,
    LOG_EVENTS: reducerLogEvent,
    LOG_ALARM: reducerLogAlarm,
    RESTART: reducerControlRestart,
    SAVES: reducerWebcamSaves
}),
    applyMiddleware(thunk)
);
