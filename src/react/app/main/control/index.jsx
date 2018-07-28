import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";

import UserTab from "./user_tab/index.jsx";
import PanelTab from "./control_tab/index.jsx";


export class Control extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.headerChange(this.props.header);
    };

    render() {
        return <div className="sens-container">
            <ul className="nav nav-tabs">
                <li className="nav-item" title="Управление пользователями">
                    <NavLink exact to="/control/" className="nav-link" activeClassName="active">Пользователи</NavLink>
                </li>
                <li className="nav-item" title="Управление устройством">
                    <NavLink to="/control/panel" className="nav-link" activeClassName="active">Панель управления</NavLink>
                </li>
            </ul>
            <div className="sens-viewport">
                <Switch>
                    <Route exact path="/control/" component={UserTab} />
                    <Route path="/control/panel" component={PanelTab} />
                </Switch>
            </div>
        </div>;
    };
};