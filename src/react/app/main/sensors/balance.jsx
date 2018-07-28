import React from "react";
import { connect } from "react-redux";
import actions from "../../../actions/action_balance.jsx";


class BalanceTab extends React.Component {
    constructor(props) {
        super(props);

        this.interval = null;
        this.onUpdateBalance = this.onUpdateBalance.bind(this);
    };

    componentDidMount() {
        // update balance every 2 seconds
        if (!this.interval) {
            // for first request
            this.props.getBalance();

            // set to interval
            this.interval = setInterval(() => {
                this.props.getBalance();
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

    onUpdateBalance() {
        this.props.updateBalance();
    };

    render() {
        return <div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr class="table-primary">
                        <th scope="col">Обновить</th>
                        <th scope="col">Дата</th>
                        <th scope="col">Сообщение</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <button className="btn btn-danger" onClick={this.onUpdateBalance}>Запрос баланса</button>
                        </td>
                        <td>
                            {this.props.balance.time ?
                                new Date(this.props.balance.time).toLocaleString("ru-RU") :
                                "Не запрашивался."}
                        </td>
                        <td>
                            {this.props.balance.score ? this.props.balance.score : "Не запрашивался."}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>;
    };
};


function mapStateToProps(state) {
    return {
        balance: state.BALANCE
    };
};

export default connect(mapStateToProps, actions)(BalanceTab);


