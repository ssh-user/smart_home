import React from "react";
import { connect } from "react-redux";
import actions from "../../actions/action_header.jsx";

class Header extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <div className="header_title">
                <h2>{this.props.title}</h2>
            </div>
        );
    };
};


function mapStateToProps(state) {
    return {
        title: state.HEADER.title
    };
};

export default connect(mapStateToProps, actions)(Header);