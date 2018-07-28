import React from "react";


export class SMS extends React.Component {
    constructor(props) {
        super(props);

        this.onRemove = this.onRemove.bind(this);
        this.onChangeEncode = this.onChangeEncode.bind(this);
    };

    onRemove() {
        this.props.removeSMS(this.props.id);
    };

    onChangeEncode() {
        this.props.changeCoding({ id: this.props.id });
    };

    render() {
        return (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>{this.props.from}</td>
                <td>{this.props.date.substring(0, this.props.date.length - 3).replace(","," ")}</td>
                <td>{this.props.dec_message}</td>
                <td className="right">
                    <button className="btn btn-success btn-sm" onClick={this.onChangeEncode}><i class="material-icons">autorenew</i></button>
                </td>
                <td className="right">
                    <button className="btn btn-danger" onClick={this.onRemove}>Удалить</button>
                </td>
            </tr>
        );
    };
};