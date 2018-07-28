import React from "react";
import { connect } from "react-redux";
import action from "../../../actions/action_logout.jsx";

class Logout extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.headerChange(this.props.header);

        // call action to logout
        this.props.logout();
    };

    render() {
        return <h2>Выходим, пожалуйста подождите.</h2>;
    };
};


export default connect(null, action)(Logout);