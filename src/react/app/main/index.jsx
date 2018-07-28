import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

// redux store
import { connect } from "react-redux";
import action from "../../actions/action_header.jsx";

// components
import Home from "./home/index.jsx";
import { Control } from "./control/index.jsx";
import { About } from "./about/index.jsx";
import Camera from "./camera/index.jsx";
import Saves from "./saves/index.jsx";
import Logout from "./logout/index.jsx";
import { Sensors } from "./sensors/index.jsx";


class Main extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <div>
                <Switch>
                    <Route
                        exact path="/"
                        component={() =>
                            <Home header={this.props.titles[0].header} headerChange={this.props.changeHeader} />}
                    />
                    <Route
                        path="/camera"
                        component={() =>
                            <Camera header={this.props.titles[1].header} headerChange={this.props.changeHeader} />}
                    />
                    <Route
                        path="/saves"
                        component={() =>
                            <Saves header={this.props.titles[2].header} headerChange={this.props.changeHeader} />}
                    />
                    <Route
                        path="/sensors"
                        component={() =>
                            <Sensors header={this.props.titles[3].header} headerChange={this.props.changeHeader} />}
                    />
                    <Route
                        path="/control"
                        component={() =>
                            <Control header={this.props.titles[4].header} headerChange={this.props.changeHeader} />}
                    />
                    <Route
                        path="/about"
                        component={() =>
                            <About header={this.props.titles[5].header} headerChange={this.props.changeHeader} />}
                    />
                    <Route
                        path="/logout"
                        component={() =>
                            <Logout header={this.props.titles[6].header} headerChange={this.props.changeHeader} />}
                    />
                </Switch>
            </div>
        );
    };
};

// need for headers
function mapStateToProps(state) {
    return {
        titles: state.MENU
    };
};

export default withRouter(
    connect(mapStateToProps, action)(Main)
);
