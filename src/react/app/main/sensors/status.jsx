import React from "react";
import { connect } from "react-redux";
import actions from "../../../actions/action_sensors.jsx";


class StatusTab extends React.Component {
    constructor(props) {
        super(props);

        this.interval = null;
    };

    componentDidMount() {
        // get modem status every 2 seconds
        if (!this.interval) {
            // for first request
            this.props.getStatus();

            // set to interval
            this.interval = setInterval(() => {
                this.props.getStatus();
            }, 1000 * 2);
        };
    };

    componentWillUnmount() {
        // clear interval on unmount components
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        };
    };

    render() {
        return <div>
            <table class="table table-striped">
                <thead>
                    <tr class="table-primary">
                        <th scope="col">Наименование</th>
                        <th scope="col">Состояние</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><p>Состояние модема</p></td>
                        <td>{this.props.status.status ?
                            <b className="text-success">OK</b> :
                            <b className="text-danger">FALSE</b>
                        }</td>
                    </tr>
                    <tr>
                        <td><p>Состояние SIM карты</p></td>
                        <td>{this.props.status.sim ?
                            <b className="text-success">OK</b> :
                            <b className="text-danger">FALSE</b>
                        }</td>
                    </tr>
                    <tr>
                        <td><p>Состояние GSM сети</p></td>
                        <td>{this.props.status.gsm ?
                            <b className="text-success">OK</b> :
                            <b className="text-danger">FALSE</b>
                        }</td>
                    </tr>
                    <tr>
                        <td><p>Качество GSM сигнала</p></td>
                        <td>{this.props.status.signal ?
                            <b>{this.props.status.signal}</b> :
                            <b className="text-danger">FALSE</b>
                        }</td>
                    </tr>
                    <tr>
                        <td><p>Модель модема</p></td>
                        <td>{this.props.status.model ?
                            <b>{this.props.status.model}</b> :
                            <b className="text-danger">FALSE</b>
                        }</td>
                    </tr>
                </tbody>
            </table>
        </div>;
    };
};

function mapStateToProps(state) {
    return {
        status: state.SENSORS
    };
};

export default connect(mapStateToProps, actions)(StatusTab);