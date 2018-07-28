import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";

import SmsTab from "./sms_tab.jsx";
import StatusTab from "./status.jsx";
import BalanceTab from "./balance.jsx";
import AlarmLogTab from "./alarm_log.jsx";
import EventsLogTab from "./events_log.jsx";


export class Sensors extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.headerChange(this.props.header);
    };

    render() {
        return <div className="sens-container">
            <ul className="nav nav-tabs">
                <li className="nav-item" title="Состояние модема">
                    <NavLink exact to="/sensors/" className="nav-link" activeClassName="active">Статус</NavLink>
                </li>
                <li className="nav-item" title="Мобильный счет">
                    <NavLink to="/sensors/balance" className="nav-link" activeClassName="active">Баланс</NavLink>
                </li>
                <li className="nav-item" title="Входящие СМС">
                    <NavLink to="/sensors/sms" className="nav-link" activeClassName="active">СМС</NavLink>
                </li>
                <li className="nav-item" title="Кто и когда устанавливал\снимал сигнализацию">
                    <NavLink to="/sensors/alarm" className="nav-link" activeClassName="active">Лог постановки</NavLink>
                </li>
                <li className="nav-item" title="Какие датчики сработали и когда">
                    <NavLink to="/sensors/event" className="nav-link" activeClassName="active">Лог событий</NavLink>
                </li>
            </ul>
            <div className="sens-viewport">
                <Switch>
                    <Route exact path="/sensors/" component={StatusTab} />
                    <Route path="/sensors/balance" component={BalanceTab} />
                    <Route path="/sensors/sms" component={SmsTab} />
                    <Route path="/sensors/alarm" component={AlarmLogTab} />
                    <Route path="/sensors/event" component={EventsLogTab} />
                </Switch>
            </div>
        </div>;
    };
};