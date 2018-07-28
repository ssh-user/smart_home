import React from "react";
import { connect } from "react-redux";
import actions from "../../../../actions/action_user.jsx";

import { UserList } from "./user_list.jsx";
import { AddPanel } from "./add_panel.jsx";


class UserPage extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        // get users list from server
        this.props.getUsers();
    };

    render() {
        return (
            <div>
                <AddPanel addUser={this.props.addUser} />
                <UserList USER={this.props} />
            </div>
        );
    };
};


function mapStateToProps(state) {
    return state.USER;
};

export default connect(mapStateToProps, actions)(UserPage);