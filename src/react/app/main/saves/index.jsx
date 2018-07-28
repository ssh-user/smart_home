import React from "react";
import { connect } from "react-redux";
import action from "../../../actions/action_saves.jsx";
import { File } from "./file.jsx";


class Saves extends React.Component {
    constructor(props) {
        super(props);

        this.onRefresh = this.onRefresh.bind(this);
    };

    componentDidMount() {
        // update header.
        this.props.headerChange(this.props.header);

        // get files from server.
        this.props.refresh();
    };

    onRefresh() {
        this.props.refresh();
    };


    render() {
        return <div className="sens-container sens-viewport">
            <div>
                <div className="right">
                    <button type="button" className="btn btn-success margin_bottom" onClick={this.onRefresh}>Обновить</button>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr class="table-warning">
                                <th scope="col">#</th>
                                <th scope="col">Название файла</th>
                                <th scope="col">Размер</th>
                                <th scope="col"></th>
                                <th scope="col" className="right">Управление</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.saves.length == 0 ?

                                <td colspan="5" style={{ textAlign: "center" }}>
                                    <b>Файлов - нет.</b>
                                </td> :

                                this.props.saves.map((elem, index) => {
                                    return <File
                                        index={index + 1}
                                        name={elem.name}
                                        size={elem.size}
                                        removeFile={this.props.removeFile}
                                        downloadFile={this.props.downloadVideoFile}
                                    />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>;
    };
};


function mapStateToProps(state) {
    return {
        saves: state.SAVES
    };
};

export default connect(mapStateToProps, action)(Saves);