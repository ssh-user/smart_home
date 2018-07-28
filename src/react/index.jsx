import React from "react";
import ReactDOM from "react-dom";


// store
import { Provider } from "react-redux";
import { store } from "./store/index.jsx";

// main component
import { App } from "./app/app.jsx";


ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById("root")
);