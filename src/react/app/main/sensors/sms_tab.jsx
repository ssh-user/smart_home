import React from "react";
import { connect } from "react-redux";
import actions from "../../../actions/action_sms.jsx";
import { SMS } from "./sms_elem.jsx";


class SmsTab extends React.Component {
    constructor(props) {
        super(props);

        this.interval = null;
    };

    componentDidMount() {
        // get modem status every 2 seconds
        if (!this.interval) {
            // for first request
            this.props.getSMS();

            // set to interval
            this.interval = setInterval(() => {
                this.props.getSMS();
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
        return (
            <div className="table-responsive smsList">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr class="table-primary">
                            <th scope="col">#</th>
                            <th scope="col">От кого</th>
                            <th scope="col">Дата</th>
                            <th scope="col">Сообщение</th>
                            <th scope="col"></th>
                            <th scope="col" className="right">Управление</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.SMS.length == 0 ?
                                <tr>
                                    <td colspan="6" style={{ textAlign: "center" }}>
                                        <b>СМСок - нет.</b>
                                    </td>
                                </tr> :

                                this.props.SMS.map((sms, index) => {
                                    return <SMS
                                        removeSMS={this.props.removeSMS}
                                        changeCoding={this.props.changeCoding}
                                        key={sms.id}
                                        id={sms.id}
                                        index={index + 1}
                                        from={sms.from}
                                        date={sms.date}
                                        dec_message={sms.dec_message}
                                    />;
                                })
                        }
                    </tbody>
                </table>
            </div>
        );
    };
};


function mapStateToProps(state) {
    return {
        SMS: state.SMS
    };
};

export default connect(mapStateToProps, actions)(SmsTab);