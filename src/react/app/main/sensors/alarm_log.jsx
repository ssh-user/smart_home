import React from "react";
import { connect } from "react-redux";
import actions from "../../../actions/action_log_alarm.jsx";
import { Alarm } from "./alarm_log_elem.jsx";


class AlarmTab extends React.Component {
    constructor(props) {
        super(props);

        this.interval = null;
        this.onRemoveAll = this.onRemoveAll.bind(this);
    };

    componentDidMount() {
        // get modem status every 2 seconds.
        if (!this.interval) {
            // for first request.
            this.props.getAlarmLog();

            // set to interval.
            this.interval = setInterval(() => {
                this.props.getAlarmLog();
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
            this.props.removeAllAlarm();
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
                            <th scope="col">Кто</th>
                            <th scope="col">Дата</th>
                            <th scope="col">Состояние</th>
                            <th scope="col" className="right">Управление</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   // if empty list.
                            this.props.ALARM.length == 0 ?
                                <tr>
                                    <td colspan="5" style={{ textAlign: "center" }}>
                                        <b>Записей - нет.</b>
                                    </td>
                                </tr> :

                                this.props.ALARM.map((elem, index) => {
                                    return <Alarm
                                        removeAlarm={this.props.removeAlarm}
                                        key={elem.id}
                                        id={elem.id}
                                        index={index + 1}
                                        phone={elem.phone}
                                        date={elem.date}
                                        status={elem.status}
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
        ALARM: state.LOG_ALARM
    };
};

export default connect(mapStateToProps, actions)(AlarmTab);