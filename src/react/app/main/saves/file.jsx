import React from "react";


export class File extends React.Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
        this.onDownload = this.onDownload.bind(this);
    };

    onDelete() {
        this.props.removeFile(this.props.name);
    };

    onDownload() {
        this.props.downloadFile(this.props.name);
    };

    render() {
        return <tr>
            <th scope="row">{this.props.index}</th>
            <td>{this.props.name}</td>
            <td><b>{(this.props.size / 1000 / 1000).toFixed(2)} Mb</b></td>
            <td className="right">
                <button type="button" className="btn btn-success" onClick={this.onDownload}>Скачать</button>
            </td>
            <td className="right">
                <button type="button" className="btn btn-danger" onClick={this.onDelete}>Удалить</button>
            </td>
        </tr>
    };
};
