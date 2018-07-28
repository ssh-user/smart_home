import React from "react";
import { connect } from "react-redux";
import actions from "../../../actions/action_sys_info.jsx";

import { SystemContainer } from "./system.jsx";
import { CameraContainer } from "./camera.jsx";
import { SensorContainer } from "./sensor.jsx";


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.interval = null;
    };

    componentDidMount() {
        this.props.headerChange(this.props.header);

        // call first time and then start interval
        this.props.getSystemInfo();
        this.interval = setInterval(() => {
            this.props.getSystemInfo();
        }, 2000);
    };

    componentWillUnmount() {
        if (this.interval) {
            window.clearInterval(this.interval)
            this.interval = null;
        };
    };

    render() {
        return (
            <div className="d-flex flex-row flex-wrap">
                <SystemContainer system={this.props.system.info} />
                <CameraContainer camera={this.props.system.camera} />
                <SensorContainer
                    sensors={this.props.system.sensors}
                    alarm={this.props.system.alarm}
                    toggleAlarm={this.props.toggleAlarm}
                />
            </div>
        );
    };
};


function mapStateToProps(state) {
    return {
        system: state.SYSTEM
    };
};

export default connect(mapStateToProps, actions)(Home);