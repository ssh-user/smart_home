import React from "react";
import { connect } from "react-redux";
import actions from "../../../../actions/action_restart.jsx";

import { ProgressBar } from "./progress_bar.jsx";


class PanelTab extends React.Component {
    constructor(props) {
        super(props);

        this.onRestart = this.onRestart.bind(this);
    };

    onRestart() {
        let answ = confirm("Вы уверены что хотите перегрузиться ?");
        // if true - restart.
        if (answ)
            this.props.restart();
    };

    render() {
        return <div>{
            this.props.restarting ?

                <div>
                    <ProgressBar progress={this.props.restarting} />
                    <p className="text-center bold">Пожалуйста подождите ...</p>
                </div> :

                <div>
                    <p><b>Нажмите кнопку, для перезагрузки приложения.</b></p>
                    <button type="button" className="btn btn-danger"
                        onClick={this.onRestart}>Перезапустить приложение</button>
                </div>
        }</div>;
    };

};


function mapStateToProps(state) {
    return state.RESTART;
};

export default connect(mapStateToProps, actions)(PanelTab);