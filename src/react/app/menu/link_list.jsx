import React from "react";
import { connect } from "react-redux";
import { LinkElement } from "./link.jsx";
import actions from "../../actions/action_menu.jsx";


class LinkList extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <nav className="list-group list-group-flush menu_list">{
                this.props.menu.map((elem) => {
                    return <LinkElement
                        changeActive={this.props.changeActiveElement}
                        id={elem.id}
                        title={elem.title}
                        to={elem.to}
                        active={elem.active}
                    />;
                })
            }</nav>
        );
    };
};


function mapStateToProps(state) {
    return {
        menu: state.MENU
    };
};

export default connect(mapStateToProps, actions)(LinkList);