import React from "react";


export class EventElem extends React.Component {
    constructor(props) {
        super(props);

        this.onRemove = this.onRemove.bind(this);
    };

    onRemove() {
        this.props.removeEvent(this.props.id);
    };

    render() {
        return (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>{this.props.sensor}</td>
                <td>{new Date(this.props.date).toLocaleString("ru-RU")}</td>
                <td className="right">
                    <button className="btn btn-danger" onClick={this.onRemove}>Удалить</button>
                </td>
            </tr>
        );
    };
};