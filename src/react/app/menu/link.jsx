import React from "react";
import { Link } from "react-router-dom";


export class LinkElement extends React.Component {
    constructor(props) {
        super(props)

        this.changeActive = this.changeActive.bind(this);
    };

    changeActive() {
        this.props.changeActive(this.props.id);
    };

    render() {
        return (
            <Link className={this.props.active ?
                "list-group-item list-group-item-action active" :
                "list-group-item list-group-item-action"}
                onClick={this.changeActive}
                to={this.props.to}>{this.props.title}
            </Link>
        );
    };
};