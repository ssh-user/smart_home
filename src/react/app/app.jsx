import React from "react";
import { BrowserRouter } from "react-router-dom";

// apps components
import Header from "./header/index.jsx";
import { Menu } from "./menu/index.jsx";
import Main from "./main/index.jsx";


export class App extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <BrowserRouter>
                <div className="container-fluid row">
                    <div className="col-2">
                        <Menu />
                    </div>
                    <div className="col-10">
                        <div className="col-*">
                            <Header />
                        </div>
                        <div className="col-*">
                            <Main />
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    };
};