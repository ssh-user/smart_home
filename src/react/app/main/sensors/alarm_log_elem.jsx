import React from "react";


export class Alarm extends React.Component {
    constructor(props) {
        super(props);

        this.onRemove = this.onRemove.bind(this);
    };

    onRemove() {
        this.props.removeAlarm(this.props.id);
    };

    render() {
        return (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>{this.props.phone}</td>
                <td>{new Date(this.props.date).toLocaleString("ru-RU")}</td>
                <td>{this.props.status == "enable" ?
                    <span className="text-danger">Поставил</span> :
                    <span className="text-success">Снял</span>
                }</td>
                <td className="right">
                    <button className="btn btn-danger" onClick={this.onRemove}>Удалить</button>
                </td>
            </tr>
        );
    };
};