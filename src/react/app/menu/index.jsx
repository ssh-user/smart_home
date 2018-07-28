import React from "react";

// components
import LinkList from "./link_list.jsx";
import { Logo } from "./logo.jsx";


export class Menu extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <div>
                <Logo />
                <LinkList />
            </div>
        );
    };
};
