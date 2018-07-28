import React from "react";


export class User extends React.Component {
    constructor(props) {
        super(props);

        this.onRemove = this.onRemove.bind(this);
    };

    onRemove() {
        this.props.removeUser(this.props.id);
    };

    render() {
        return (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>{this.props.username}</td>
                <td>{this.props.status == "active" ? "Активен" : "Не активен"}</td>
                <td>{this.props.last_login ? `${(new Date(this.props.last_login)).toLocaleString("ru-RU")}` : "Не заходил"}</td>
                <td className="right">
                    <button className="btn btn-danger" onClick={this.onRemove}>Удалить</button>
                </td>
            </tr>
        );
    };
};