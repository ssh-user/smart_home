import React from "react";
import { connect } from "react-redux";
import actions from "../../../actions/action_log_events.jsx";
import { EventElem } from "./events_log_elem.jsx";


class EventsTab extends React.Component {
    constructor(props) {
        super(props);

        this.interval = null;
        this.onRemoveAll = this.onRemoveAll.bind(this);
    };

    componentDidMount() {
        // get modem status every 2 seconds.
        if (!this.interval) {
            // for first request.
            this.props.getEventsLog();

            // set to interval.
            this.interval = setInterval(() => {
                this.props.getEventsLog();
            }, 1000 * 2);
        };
    };

    componentWillUnmount() {
        // clear interval on unmount components.
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        };
    };

    onRemoveAll() {
        let answ = confirm("Вы точно хотите удалить все записи ?");
        if (answ) {
            this.props.removeAllEvents();
        };
    };

    render() {
        return (<div>
            <div className="right">
                <button className="btn btn-danger btn_remove_all" onClick={this.onRemoveAll}>УДАЛИТЬ ВСЕ ЗАПИСИ</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr class="table-warning">
                            <th scope="col">#</th>
                            <th scope="col">Датчик</th>
                            <th scope="col">Дата</th>
                            <th scope="col" className="right">Управление</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   // if empty list.
                            this.props.EVENTS.length == 0 ?
                                <tr>
                                    <td colspan="5" style={{ textAlign: "center" }}>
                                        <b>Записей - нет.</b>
                                    </td>
                                </tr> :

                                this.props.EVENTS.map((elem, index) => {
                                    return <EventElem
                                        removeEvent={this.props.removeEvent}
                                        key={elem.id}
                                        id={elem.id}
                                        index={index + 1}
                                        sensor={elem.sensor}
                                        date={elem.date}
                                    />;
                                })
                        }
                    </tbody>
                </table>
            </div>
        </div>);
    };
};


function mapStateToProps(state) {
    return {
        EVENTS: state.LOG_EVENTS
    };
};

export default connect(mapStateToProps, actions)(EventsTab);